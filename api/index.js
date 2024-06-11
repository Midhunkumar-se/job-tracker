import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use("/api/user", userRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    console.log("MongoDB is connected");
    app.listen(3000, () => {
      console.log("Server is running own port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
