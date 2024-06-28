const { MongoClient } = require('mongodb');
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { loadQAChain } = require("langchain/chains");


// Initialize MongoDB client
const mongoClient = new MongoClient('mongodb+srv://dealOn1800:IDg7CCKEUitybSE6@cluster0.a08ehca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

Api_key = "AIzaSyCSTNxkfVcHOS_XtBqydmeEC7I14Hsl94k"

async function main() {
    try {
        // Connect to MongoDB
        await mongoClient.connect();
        const db = mongoClient.db('Ecom');
        const collection = db.collection('products');


        const documentCount = await collection.countDocuments();
        console.log(`Number of documents in collection: ${documentCount}`);


        // Create embeddings
        const embeddings = new GoogleGenerativeAIEmbeddings({
        modelName: "embedding-001",
        apiKey: Api_key,
        });

        // prepare the documents for vector store
        const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
            collection,
            indexName: "default",
            textKey: "combinedText",
            embeddingKey: "embedding",
        });
        
        console.log("Vector store created successfully");
        
        // Create combined text field if it doesn't exist
        const updateResult = await collection.updateMany(
            { combinedText: { $exists: false } },
            [
                {
                    $set: {
                        combinedText: {
                            $concat: [
                                "$name", " ",
                                "$description", " ",
                                "$category", " ",
                                { $reduce: { input: "$tags", initialValue: "", in: { $concat: ["$$value", " "] } } }, " ",
                                "$specifications.material", " ",
                                "$specifications.dimensions", " ",
                                "$specifications.weight", " ",
                                "$specifications.color", " ",
                                "$specifications.brand", " ",
                                "$availability", " ",
                                { $reduce: { input: "$deliveryOptions", initialValue: "", in: { $concat: ["$$value", " "] } } }, " ",
                                "$returnPolicy"
                            ]
                        }
                    }
                }
            ]
        );

        console.log(`Updated ${updateResult.modifiedCount} documents with combined text field`);

        // Create embeddings for the combinedText field
        const documents = await collection.find({ combinedText: { $exists: true } }).toArray();
        for (const doc of documents) {
            if (doc.combinedText){
                try{
                    const embedding = await embeddings.embedDocuments([doc.combinedText]);
                    console.log("THe combined text:",doc.combinedText,",Embedding:",embedding) // Ensure this matches the method in your library
                    await collection.updateOne({ _id: doc._id }, { $set: { embedding: embedding[0] } }); // Assuming embed returns an array
                }
                catch(error){
                    console.log("Error",error);
                }
            }
            else {
                console.warn(`Document ID ${doc._id} has an invalid combinedText field.`);
            }
        }

        console.log("Embeddings created and stored successfully");

        // Create Gemini model
        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-pro",
            apiKey: Api_key,
            maxOutputTokens: 2048,
        });

        // Create loadQAChain
        const chain = loadQAChain(model, { type: "stuff" });
    
        // User prompt
        const userPrompt = "Premium Mixer grinder";

        console.log("Performing similarity search for:", userPrompt);
        const docs = await vectorStore.similaritySearch(userPrompt, 3);
        console.log("Retrieved documents:", JSON.stringify(docs, null, 2));

        if (docs.length === 0) {
            console.log("No similar documents found.");
            return;
        }

        // Format the retrieved documents
        const formattedDocs = docs.map(doc => {
            return `Product: ${doc.metadata.name} Description: ${doc.metadata.description} Price: $${doc.metadata.price} Category: ${doc.metadata.category} Tags: ${doc.metadata.tags.join(', ')} `;
        });
                
        // Construct a prompt that includes the formatted document information
        const enhancedPrompt = `
                Based on the following product information:
                ${formattedDocs.join('\n')}
                ${userPrompt}. Can you recommend a product and explain why it might be suitable?`;
                
        const response = await chain._call({
                        input_documents: docs,
                        question: enhancedPrompt,
            });

        console.log("Response:", response.text);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoClient.close();
    }
}

main();