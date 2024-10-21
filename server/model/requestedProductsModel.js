const mongoose = require('mongoose');

const requestedProductSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    link: { type: String, required: true },
    status: { type: String, default: 'pending' }, // e.g., pending, approved, rejected
    createdAt: { type: Date, default: Date.now },
});

const RequestedProduct = mongoose.model('RequestedProduct', requestedProductSchema);
module.exports = RequestedProduct;
