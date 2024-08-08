
const express = require('express');
const router = express.Router();
const ProdController = require('../controller/productController');
const upload = require('../middleware/fileUpload');


router.get('/products',ProdController.getProducts);
router.post('/Add-products', upload.single('file'), ProdController.addProductsFromFile);
router.get('/search',ProdController.searchProducts);

module.exports = router;