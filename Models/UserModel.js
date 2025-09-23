const { Schema, model } = require("mongoose");
const { link } = require("../Routes/users");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  number_of_Product_added: {
    type: Number,
    default: false,
  },

  agree: {
    type: Boolean,
    default: false,
  },
  photoURL: {
    type: String,
    trim: true,
  },
  useraddress: [
    {
      address: { type: String, required: true, default: "" },
      number: { type: Number, required: true, default: 0 },
    },
  ],
});

const userModel = model("user", userSchema);
module.exports = userModel;
