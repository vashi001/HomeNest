import express from "express";
import { test } from "../controller/usercontroller.js";

const router = express.Router();
router.get("/text", test);

export default router;
