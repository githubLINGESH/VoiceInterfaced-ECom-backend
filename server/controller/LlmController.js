const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { loadQAChain } = require("langchain/chains");
const UserContext = require('../model/userContextModel');
const ChatHistory = require('../model/ChatHistoryModel');
const UserCart = require('../model/cartmodel');
const connectToDatabase = require('../utils/db');

const Api_key = "AIzaSyCSTNxkfVcHOS_XtBqydmeEC7I14Hsl94k";

async function storeChatHistory(userId, userInput, responseText) {
    const newMessages = [
        { role: 'user', content: userInput },
        { role: 'assistant', content: responseText }
    ];

    await ChatHistory.findOneAndUpdate(
        { userId: userId },
        { $push: { history: { $each: newMessages } } },
        { upsert: true, new: true }
    );
}

exports.PromptResponse = async (req, res) => {
    const genAI = new ChatGoogleGenerativeAI({
        modelName: "gemini-pro",
        apiKey: Api_key,
        maxOutputTokens: 2048,
    });
    // Connect to MongoDB
    const { db, mongoClient } = await connectToDatabase();
    const vectorizedCollection = db.collection('vectorized_products');

    try {
        const userId = req.session.userId;

        // Fetch user context
        let userContext = await UserContext.findOne({ userId });
        if (!userContext) {
            userContext = {
                name: "Customer",
                previousPurchases: [],
                preferredCategories: [],
                loyaltyStatus: "Regular"
            };
        }

        // Fetch chat history
        let chatHistory = await ChatHistory.find({ userId }).sort({ createdAt: 1 });
        if (!chatHistory || chatHistory.length === 0) {
            chatHistory = [
                { role: "assistant", content: "How can I assist you today?" }
            ];
        }

        // Fetch user cart
        let userCart = await UserCart.find({ userId });
        console.log("Carts",userCart);
        if (!userCart || userCart.length === 0) {
            userCart = [];
        }

        const userInput = req.body.userInput;

        // Perform MongoDB search query
        const pipeline = [
            {
                $search: {
                    index: "default",
                    text: {
                        query: userInput,
                        path: "combinedText"
                    }
                }
            },
            {
                $limit: 3
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    category: 1,
                    tags: 1,
                    specifications: 1,
                    score: { $meta: "searchScore" }
                }
            }
        ];
        const searchResults = await vectorizedCollection.aggregate(pipeline).toArray();
        console.log("Search Results:", JSON.stringify(searchResults, null, 2));
        
        // Optionally, handle results based on score
        const MINIMUM_SCORE_THRESHOLD = 0.08; // Define a minimum score threshold if needed
        const filteredResults = searchResults.filter(result => result.score >= MINIMUM_SCORE_THRESHOLD);
        
        if (filteredResults.length === 0) {
            console.log("No high-score results found. Showing all retrieved results.");
        }
        
        // Format the retrieved documents
        const formattedDocs = searchResults.map(doc => {
            return `Product: ${doc.name}
                    Description: ${doc.description}
                    Price: $${doc.price}
                    Category: ${doc.category}
                    Tags: ${doc.tags.join(', ')}
                    Specifications: ${JSON.stringify(doc.specifications)}`;
                            });

        // Construct a prompt for the LLM
        const enhancedPrompt = `
                You are an AI assistant for an e-commerce website, acting as a friendly and knowledgeable sales representative. Your name is Alex. You're helping a customer named ${userContext.name}, who is a ${userContext.loyaltyStatus}. Based on the following information:

                Product Information:
                ${formattedDocs.join('\n\n')}

                User Context:
                - Previous Purchases: ${userContext.previousPurchases.join(', ')}
                - Preferred Categories: ${userContext.preferredCategories.join(', ')}

                Chat History:
                ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

                User's Current Cart:
                ${userCart.map(item => `- ${item.name} ($${item.price})`).join('\n')}

                The customer is interested in: "${userInput}".

                Please provide a friendly and personalized response that:
                1. Addresses the customer by name and acknowledges their loyalty status
                2. References their chat history and shows understanding of their needs
                3. Recommends the most suitable product(s) from the list above, explaining why it fits their requirements
                4. Highlights key features and benefits, relating them to the customer's preferences and previous purchases
                5. Suggests any relevant accessories or complementary products, possibly referencing items in their cart
                6. Provides a brief comparison if there are multiple suitable options
                7. Includes a warm and encouraging call-to-action, inviting the customer to make a purchase or ask for more information
                8. Maintains a conversational, helpful tone throughout, as if you're a real salesperson chatting with a valued customer

                Your response should be informative, engaging, and tailored to this specific customer's context and needs.`;

        // Generate response using LLM
        const chain = loadQAChain(genAI, { type: "stuff" });
        const response = await chain._call({
            input_documents: searchResults,
            question: enhancedPrompt,
        });

        // Store chat history
        await storeChatHistory(userId, userInput, response.text);

        console.log("AI Response:", response.text);

        res.status(200).json({ "Response": response.text });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ "Error Occurred": error });
    } finally {
        await mongoClient.close();
    }
};
