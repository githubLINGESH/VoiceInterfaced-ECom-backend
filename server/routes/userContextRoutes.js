const express = require('express');
const router = express.Router();
const userContextController = require('../controller/userContextController');

// Define routes
router.post('/usercontext', userContextController.AddUserContext);
router.put('/usercontext/:id', userContextController.updateUserContext);

// Route to save a viewed product
router.post('/viewed-product', userContextController.postViewedProduct);

// Route to get the latest viewed products by user ID
router.get('/get-viewed-product/', userContextController.getLatestViewedProducts);

module.exports = router;
