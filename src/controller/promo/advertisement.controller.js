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
