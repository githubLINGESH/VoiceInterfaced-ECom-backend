const chatHistory = require('../model/ChatHistoryModel');

exports.AddChats = async(req,res) =>{
    try{
        const AddchatHistory = new chatHistory(req.body);
        chatHistory.insertOne(AddchatHistory);
        res.status(200).json("successfully Added");
    }
    catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}

exports.getChats = async(req,res) => {
    try{
        const userId = req.userId;
        const getChats = await chatHistory.findBy({userId:userId});
        res.status(200).json(getChats);
    }
    catch(error){
        res.status(400).json(error);
    }
}