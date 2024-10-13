import express from "express";
import {
  createListing,
  deleteListing,
} from "../controller/listingcontroller.js";
import { verifyToken } from "./../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", deleteListing);

export default router;
