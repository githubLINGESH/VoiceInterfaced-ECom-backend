// server/routes/cart.routes.js
const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

router.post('/add-to-cart', CartController.addToCart);
router.get('/getcart-products',CartController.getCart);
// Delete product from cart
router.delete('/deleteProduct/:productId', CartController.deleteProductFromCart);

module.exports = router;
