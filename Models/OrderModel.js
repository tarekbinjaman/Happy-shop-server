const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userEmail: { type: String, required: true },
  item: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      color: { type: String, required: true },
      price: { type: Number, required: true },
      size: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  shippingAddress: {
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: Number, required: true}
  },
  status: {type: String, required: true},
  subTotal: {type: Number, required: true},
  shippingCost: {type: Number, required: true},
  totalAmount: {type: Number, required: true},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const orderModel = model("order", orderSchema);
module.exports = orderModel;