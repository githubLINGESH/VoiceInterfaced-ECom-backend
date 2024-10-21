const mongoose = require('mongoose');


const latestViewedProductSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImageSrc: { type: String, required: true },
  viewedAt: { type: Date, default: Date.now }
});

const LatestViewedProduct = mongoose.model('LatestViewedProduct', latestViewedProductSchema);

module.exports  = LatestViewedProduct;
