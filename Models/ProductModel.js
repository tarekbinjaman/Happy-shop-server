const { Schema } = require("mongoose");
const { model } = require("mongoose");
const { url } = require("../cloudinary");

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 70,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    },
    images: [
        {
            url: { type: String, required: true },
            public_id: { type: String, required: true }
        }
    ],
    gender: {
        type: String,
        required: true
    },
    color: {
        type: [String]
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    brand: {
        type: String,
        required: true
    },
    fitType: {
        type: String,
        required: true
    },
    materials: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const ProductModel = model("products", productSchema)
module.exports = ProductModel