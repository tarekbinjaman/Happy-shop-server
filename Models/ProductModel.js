const { Schema } = require("mongoose");
const { model } = require("mongoose");

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
    finalPrice:{
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    color: {
        type: [String]
    }
})

const ProductModel = model("products", productSchema)
module.exports = ProductModel