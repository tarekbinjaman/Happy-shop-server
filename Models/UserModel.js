const {Schema, model} = require("mongoose");

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
});

const userModel = model("user", userSchema)
module.exports = userModel