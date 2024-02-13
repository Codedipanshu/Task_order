import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import JWT_SECRET from "../config/jwt.js";
const rootRouter = express.Router();

rootRouter.post("/add-user", async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(411).json({
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, phoneNumber, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: `User ${name} created successfully` });
  } catch (error) {
    res.status(400).json("Some error occurred");
  }
});

rootRouter.post("/login-user", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(411).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(411).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).json({token});
  } catch (error) {
    res.status(400).json("Some error occurred");
  }
});

rootRouter.post("/add-order", authMiddleware, async (req, res) => {
  try {
    const { subTotal, phoneNumber } = req.body;
    const order = new Order({
      userId: req.userId,
      subTotal,
      phoneNumber,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).json("Some error occurred");
  }
});

rootRouter.get("/get-order", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.send(orders);
  } catch (error) {
    res.status(400).json("Some error occurred");
  }
});

export default rootRouter;
