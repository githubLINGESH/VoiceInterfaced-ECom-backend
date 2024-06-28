const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
});

const specificationSchema = new Schema({
    material: { type: String, required: true },
    dimensions: { type: String, required: true },
    weight: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true }
});

const productSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    imageSrc: { type: String, required: true },
    store: { type: String, required: true },
    price: { type: Number, required: true },
    d_price: { type: Number, required: true },
    discount: { type: Number, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    rating: { type: Number, required: true },
    reviews: [reviewSchema],
    specifications: specificationSchema,
    availability: { type: String, required: true },
    deliveryOptions: { type: [String], required: true },
    returnPolicy: { type: String, required: true },
    relatedProducts: { type: [Number], required: true }
});

const prod = mongoose.model("Products", productSchema);

module.exports = prod;