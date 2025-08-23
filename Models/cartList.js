const { Schema, model } = require("mongoose");

const cartListSchema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cartListModel = model("CartList", cartListSchema);
module.exports = cartListModel;
