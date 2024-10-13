import { errorHandler } from "../utils/error.js";
import Listing from "./../models/listingmodel.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing Not Found"));
  // if (req.user.id !== listing.useRef)
  //   return next(errorHandler(404, "You can only delete Your own listings"));
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing Has been deleted");
  } catch (error) {
    next(error);
  }
};
