import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(201).json("User created Successfully");
  } catch (error) {
    console.log("error at authcontroller", error);
    next(error);
    // next(errorHandler(550, "error from function"));
    // res.status(500).json(error.message);
  }
};
