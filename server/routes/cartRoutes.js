// server/routes/cart.routes.js
const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

router.post('/add-to-cart', CartController.addToCart);
router.get('/getcart-products',CartController.getCart);
// Add more cart-related routes as needed

module.exports = router;
