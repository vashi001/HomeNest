import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userroute.js";
import cors from "cors";
// since we are using export default we can change the name here as there is only one export hence no error
import authRouter from "./routes/authroute.js";
import cookieParser from "cookie-parser";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// the upper express.json() accepts the json data
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
