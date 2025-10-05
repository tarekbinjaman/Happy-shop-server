const { Schema, model } = require("mongoose");

const wishListSchema = new Schema({
      userEmail: {type: String, required: true},
  title: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true},
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  image: {type: String, required: true},
  description: {type: String, required: true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const WishlistModel = model("WishList", wishListSchema);
module.exports = WishlistModel;