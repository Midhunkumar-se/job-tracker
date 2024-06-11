import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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
