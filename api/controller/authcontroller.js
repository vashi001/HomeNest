import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  console.log("hello from signin", req);
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "user Not Found"));
    }
    const ValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!ValidPassword) return next(errorHandler(401, " Wrong Credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    //._doc gives the correct exprected response other wise we get too many things from the response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
