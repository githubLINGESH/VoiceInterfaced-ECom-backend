const { GoogleGenerativeAI } = require("@google/generative-ai");
const UserContext = require('../model/userContextModel');

exports.PromptResponse = async (req, res) => {
    const genAI = new GoogleGenerativeAI("AIzaSyCSTNxkfVcHOS_XtBqydmeEC7I14Hsl94k");

    try {
        const languages = [
            {'fr-FR': 'French' },
            {'de-DE' : 'German' },
            { 'ta-IN': 'Tamil'}
        ];

        const prompt = req.body.userInput;
        const languageCode = req.body.language;

        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

        // Function to get language name from code
        function getLanguageName(code) {
            const language = languages.find(lang => Object.keys(lang)[0] === code);
            return language ? Object.values(language)[0] : code;
        }

        let enhancedPrompt = prompt;

        if (languageCode && languageCode !== 'en-US' && languageCode !== 'es-ES') {
            const languageName = getLanguageName(languageCode);
            enhancedPrompt = `Respond to the following in ${languageName}. Ensure your entire response is in ${languageName}: ${prompt}`;
        }

        console.log(enhancedPrompt);
        const result = await model.generateContent(enhancedPrompt);
        const response = await result.response;
        const text = response.text();
        console.log("Generated Response:", text);

        // Example: Save context or update context based on the response
        const userId = req.body.userId;
        const contextData = req.body.contextData;

        //await saveContext(userId, contextData);

        res.status(200).json({ "Response": text });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ "Error Occurred": error });
    }
};

// Function to save context or update context in MongoDB
const saveContext = async (userId, contextData) => {
    await UserContext.findOneAndUpdate({ userId: userId }, contextData, { upsert: true });
};

// Function to get recommendations based on user context
const getRecommendations = async (userId) => {
    try {
        const userContext = await UserContext.findOne({ userId: userId });

        // Example: Query products database for recommendations based on user context
        const recommendedProducts = await Product.find({
            vendor: userContext.preferences.vendor,
            purchasedRate: { $gte: userContext.preferences.minPurchasedRate }
        }).limit(5).sort({ purchasedRate: -1 });

        return recommendedProducts;
    } catch (error) {
        console.error("Error getting recommendations:", error);
        return [];
    }
};
