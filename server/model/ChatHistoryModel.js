const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userId: { type: String, ref: 'usercontexts', required: true },
    history: [{
        role: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;