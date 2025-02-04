const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [4, "First Name should be more than 4 characters"],
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String, // Changed from Number to String
    required: true,
    minLength: [6, "Zip code must be exactly 6 characters"],
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    min: [1000000000, "Phone number must be exactly 10 digits"],
    max: [9999999999, "Phone number must be exactly 10 digits"],
  },
  items: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
      image: { type: String, required: true },
      status: {
        type: String,
        default: "Order Placed",
        enum: [
          "Order Placed",
          "Packing",
          "Shipped",
          "Out for delivery",
          "Delivered",
        ],
      },
    },
  ],
  totalQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalRevenue: {
    type: Number,
    required: true,
    default: 74,
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
