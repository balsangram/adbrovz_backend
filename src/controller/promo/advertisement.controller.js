import Promotion from "../../model/promo/Promotion.model.js";
import { getDistanceFromLatLonInKm } from "../../utils/distanceCalculator.js";
// import { getDistanceFromLatLonInKm } from "../utils/distanceCalculator.js"; // Make sure this exists and works

export const draftAdvertisement = async (req, res, next) => {
  try {
    const newADV = await Promotion.find({ advertisement_type: "" });

    if (newADV.length === 0) {
      return res.status(404).json({ message: "No new advertisements found." });
    }

    res
      .status(200)
      .json({ message: "New advertisements found:", data: newADV });
  } catch (error) {
    next(error);
  }
};

export const newAdvertisement = async (req, res, next) => {
  try {
    const newADV = await Promotion.find({ advertisement_type: "" });

    if (newADV.length === 0) {
      return res.status(404).json({ message: "No new advertisements found." });
    }

    res
      .status(200)
      .json({ message: "New advertisements found:", data: newADV });
  } catch (error) {
    next(error);
  }
};

export const AcceptAdvertisement = async (req, res, next) => {
  try {
    const newADV = await Promotion.find({ advertisement_type: "Accept" });

    if (newADV.length === 0) {
      return res
        .status(404)
        .json({ message: "No accepted advertisements found." });
    }

    res.status(200).json({
      message: "Accepted advertisements retrieved successfully.",
      data: newADV,
    });
  } catch (error) {
    next(error);
  }
};

export const RejectedAdvertisement = async (req, res, next) => {
  try {
    const newADV = await Promotion.find({ advertisement_type: "Reject" });

    if (newADV.length === 0) {
      return res
        .status(404)
        .json({ message: "No rejected advertisements found." });
    }

    res.status(200).json({
      message: "Rejected advertisements retrieved successfully.",
      data: newADV,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewAdvertisement = async (req, res, next) => {
  try {
    const newADV = await Promotion.find({ advertisement_type: "Review" });

    if (newADV.length === 0) {
      return res
        .status(404)
        .json({ message: "No advertisements pending review found." });
    }

    res.status(200).json({
      message: "Advertisements pending review retrieved successfully.",
      data: newADV,
    });
  } catch (error) {
    next(error);
  }
};

export const featuredDetails = async (req, res, next) => {
  try {
    const { lat_long } = req.body;

    if (!lat_long) {
      return res.status(400).json({ message: "lat_long is required in body" });
    }

    const [userLat, userLng] = lat_long
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    // Fetch all featured promotions
    const allFeaturedPromos = await Promotion.find({ vs_featured: true });

    // Add distance to each promotion
    const withDistances = allFeaturedPromos.map((promo) => {
      if (promo.lat_long) {
        const [promoLat, promoLng] = promo.lat_long
          .split(",")
          .map((coord) => parseFloat(coord.trim()));
        promo.distance = getDistanceFromLatLonInKm(
          userLat,
          userLng,
          promoLat,
          promoLng
        );
      } else {
        promo.distance = Infinity; // put far away if no location
      }
      return promo;
    });

    // Sort by distance
    const sortedPromos = withDistances.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      message: "Sorted featured promotions by distance",
      featured_promotions: sortedPromos,
    });
  } catch (error) {
    next(error);
  }
};

export const dashBoardDetails = async (req, res, next) => {
  try {
    const allDashboardDetails = await Promotion.find({ vs_featured: false });
    res
      .status(200)
      .json({ message: "dashboard details are", allDashboardDetails });
  } catch (error) {
    next(error);
  }
};

// app
