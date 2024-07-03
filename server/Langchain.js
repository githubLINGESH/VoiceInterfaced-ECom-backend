const { MongoClient } = require('mongodb');
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { loadQAChain } = require("langchain/chains");

const mongoClient = new MongoClient('mongodb+srv://dealOn1800:IDg7CCKEUitybSE6@cluster0.a08ehca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const Api_key = "AIzaSyCSTNxkfVcHOS_XtBqydmeEC7I14Hsl94k"

async function main() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db('Ecom');
        const vectorizedCollection = db.collection('vectorized_products');

        // Simulated user context and chat history (replace with actual data in production)
        const userContext = {
            name: "John",
            previousPurchases: ["Kitchen Blender", "Coffee Maker"],
            preferredCategories: ["Kitchen Appliances", "Home Decor"],
            loyaltyStatus: "Gold Member"
        };

        const chatHistory = [
            { role: "user", content: "I'm looking for a high-quality mixer grinder." },
            { role: "assistant", content: "Certainly! I'd be happy to help you find a high-quality mixer grinder. Could you tell me more about what features are important to you?" },
            { role: "user", content: "I need something powerful and durable for daily use." }
        ];

        const userCart = [
            { name: "Stainless Steel Cookware Set", price: 129.99 },
            { name: "Digital Kitchen Scale", price: 24.99 }
        ];

        const userPrompt = "Premium Mixer grinder";
        console.log("Searching for:", userPrompt);

        // Use raw MongoDB query
        const pipeline = [
            {
                $search: {
                    index: "default",
                    text: {
                        query: userPrompt,
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

        if (searchResults.length === 0) {
            console.log("No results found. Please check your data and index.");
            return;
        }

        // Create Gemini model
        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-pro",
            apiKey: Api_key,
            maxOutputTokens: 2048,
        });

        // Create loadQAChain
        const chain = loadQAChain(model, { type: "stuff" });

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
${chatHistory.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n')}

User's Current Cart:
${userCart.map(item => `- ${item.name} ($${item.price})`).join('\n')}

The customer is interested in: "${userPrompt}". 

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

        const response = await chain.call({
            input_documents: searchResults,
            question: enhancedPrompt,
        });

        console.log("AI Response:", response.text);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoClient.close();
    }
}

main();