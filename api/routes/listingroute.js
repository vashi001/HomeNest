import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controller/listingcontroller.js";
import { verifyToken } from "./../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", deleteListing);
router.post("/update/:id", updateListing);
router.get("/get/:id", getListing);

export default router;
