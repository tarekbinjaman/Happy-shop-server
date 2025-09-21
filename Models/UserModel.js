const { Schema, model } = require("mongoose");
const { link } = require("../Routes/users");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    number_of_Product_added: {
        type: Number,
        default: false
    },

    agree: {
        type: Boolean,
        default: false
    },
    photoURL: {
        type: String,
        trim: true
    },
    useraddress: {
        type: String,
        trim: true,
        default: ""
    }

});

const userModel = model("user", userSchema)
module.exports = userModel