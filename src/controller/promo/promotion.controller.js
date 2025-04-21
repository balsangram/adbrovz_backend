import Promo from "../../model/promo/Promotion.model.js"; // Adjust path if needed
import DrafPromotion from "../../model/promo/DraftPromotionDetails.model.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import Promotion from "../../model/promo/Promotion.model.js";

export const createPromotion = async (req, res, next) => {
  try {
    console.log("files", req.files);

    const {
      promo_name,
      phone,
      category,
      sub_category,
      promo_title,
      description,
      notification,
      lat_long,
      location_name,
      pincode,
      advertisement_type,
    } = req.body;

    console.log(req.body, "body");

    // Upload files to Cloudinary if they exist
    let logoUrl = "";
    let promoImgUrl = "";

    if (req.files?.logo?.[0]) {
      const logoResult = await uploadToCloudinary(
        req.files.logo[0].buffer,
        "promotions/logos" // Cloudinary folder
      );
      logoUrl = logoResult.secure_url;
    }

    if (req.files?.promo_img?.[0]) {
      const promoImgResult = await uploadToCloudinary(
        req.files.promo_img[0].buffer,
        "promotions/images" // Cloudinary folder
      );
      promoImgUrl = promoImgResult.secure_url;
    }

    const newPromo = await Promo.create({
      promo_name: promo_name || "",
      phone: phone || "",
      category: category || "",
      sub_category: sub_category || "",
      logo: logoUrl,
      promo_title: promo_title || "",
      description: description || "",
      notification: notification || "",
      promo_img: promoImgUrl,
      lat_long: lat_long || "",
      location_name: location_name || "",
      pincode: pincode || "",
      advertisement_type: advertisement_type || "",
    });

    res.status(201).json({
      message: "Promotion created successfully",
      data: newPromo,
    });
  } catch (error) {
    next(error);
  }
};

export const drafPromotion = async (req, res, next) => {
  try {
    const {
      promo_title,
      description,
      notification,
      business_name,
      location_name,
      pincode,
      email,
      phone,
    } = req.body;

    console.log("🚀 ~ req.body:", req.body);
    console.log("🚀 ~ promo_title:", promo_title);

    if (!promo_title) {
      return res.status(400).json({ message: "promo_title is required" });
    }

    if (
      !req.files ||
      !req.files.promo_img ||
      req.files.promo_img.length === 0
    ) {
      return res.status(400).json({ message: "promo_img is required" });
    }

    const promoImgFile = req.files.promo_img[0];
    const uploadResult = await uploadToCloudinary(
      promoImgFile.buffer,
      "adbrovz/promotions"
    );
    const imageUrl = uploadResult.secure_url;

    let savedDraft;

    const allFieldsPresent =
      promo_title &&
      description &&
      notification &&
      business_name &&
      location_name &&
      pincode &&
      email &&
      phone;

    const data = {
      promo_title,
      description,
      notification,
      promo_img: imageUrl,
      business_name,
      location_name,
      pincode,
      email,
      phone,
    };

    if (allFieldsPresent) {
      console.log("✅ Saving in Promotion");
      const promotion = new Promotion(data);
      savedDraft = await promotion.save();
    } else {
      console.log("📝 Saving in DrafPromotion");
      const draft = new DrafPromotion(data);
      savedDraft = await draft.save();
    }

    res.status(201).json({
      message: "Saved successfully",
      data: savedDraft,
    });
  } catch (error) {
    console.error("🔥 Draft Save Error:", error);
    next(error);
  }
};
