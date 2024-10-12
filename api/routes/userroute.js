import express from "express";
import { deleteUser, test, updateUser } from "../controller/usercontroller.js";
import { verifyToken } from "../utils/verifyUser.js";
// in local storage cookie is not being set hence removed verifytoken funcationality

const router = express.Router();
router.get("/text", test);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
