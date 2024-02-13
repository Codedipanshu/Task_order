import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import rootRouter from "./routes/rootRoutes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log(`Server running on port 3000!`);
});
