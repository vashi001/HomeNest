import express from "express";
import { test, updateUser } from "../controller/usercontroller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get("/text", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
