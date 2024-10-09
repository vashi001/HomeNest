import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userroute.js";
// since we are using export default we can change the name here as there is only one export hence no error
import authRouter from "./routes/authroute.js";
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
app.use(express.json());
// the upper express.json() accepts the json data
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
