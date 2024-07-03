const mongoose = require('mongoose');

const UserContextSchema = new mongoose.Schema({
    name: { type: String, required: true },
    loyaltyStatus: { type: String, required: true },
    previousPurchases: [{ type: String }],
    preferredCategories: [{ type: String }],
    currentCart: [{
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }]
});

const UserContext = mongoose.model("UserContext", UserContextSchema);

module.exports = UserContext;
