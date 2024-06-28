const mongoose = require('mongoose');

const UserContextSchema = new mongoose.Schema({
    userId: String,
    lastPurchase: String,
    preferences: [String],
    // Other relevant fields
});

const userCon = mongoose.model("UserConText",UserContextSchema);

module.exports = userCon;