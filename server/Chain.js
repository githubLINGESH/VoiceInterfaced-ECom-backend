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
You are an AI assistant for an e-commerce website. Based on the following product information:

${formattedDocs.join('\n\n')}

A customer is interested in: "${userPrompt}". 
Please provide a helpful response that:
1. Recommends the most suitable product(s) from the list above
2. Highlights key features and benefits
3. Suggests any relevant accessories or complementary products
4. Provides a brief comparison if there are multiple suitable options
5. Includes a friendly call-to-action encouraging the customer to make a purchase or ask for more information

Your response should be informative, engaging, and tailored to an e-commerce context.`;

        const response = await chain._call({
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