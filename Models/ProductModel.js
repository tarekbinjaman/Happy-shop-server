const { model } = require("mongoose");
const { schema } = require("./UserModel");

const productSchema = new schema({
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
        type: String,
        required: true
    },
    price: {
        type: Boolean,
        required: true
    },
    discount: {
        type: Boolean,
        required: true
    },
    finalPrice:{
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    color: {
        type: String
    }
})

const ProductModel = model("products", productSchema)
module.exports = ProductModel