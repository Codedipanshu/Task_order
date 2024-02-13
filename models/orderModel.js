import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  subTotal: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
