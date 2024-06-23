import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());

const __dirname = path.resolve();

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandlerMiddleware);
app.use(notFound);

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
