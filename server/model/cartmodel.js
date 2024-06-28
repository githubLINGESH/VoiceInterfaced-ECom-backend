    // server/models/cart.model.js
    const mongoose = require('mongoose');

    const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    products: [{
        id: {
            type: String,
            required: true,
            ref: 'id'
            },
        name: String,
        imageSrc: String,
        store: String,
        price: Number,
        d_price: Number,
        discount: String,
        description: String,
        link: String
            
        }]
        });

    const Cart = mongoose.model('carts', cartSchema);

    module.exports = Cart;
