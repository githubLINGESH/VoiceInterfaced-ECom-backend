const mongoose = require('mongoose');

const TrendingProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  viewedAt: { type: Date, default: Date.now }
});

const TrendingProduct = mongoose.model('LatestViewedProduct', TrendingProductSchema);

module.exports = TrendingProduct;
