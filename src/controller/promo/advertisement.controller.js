import Promotion from "../../model/promo/Promotion.model.js";

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
