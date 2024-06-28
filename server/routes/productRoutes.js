
const express = require('express');
const router = express.Router();
const ProdController = require('../controller/productController');

router.get('/products',ProdController.getProducts);
router.post('/Add-products', ProdController.AddProducts);

module.exports = router;