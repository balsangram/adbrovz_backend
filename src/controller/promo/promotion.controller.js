import Promo from "../../model/promo/Promotion.model.js"; // Adjust path if needed

export const createPromotion = async (req, res, next) => {
  try {
    console.log("file", req.files);

    const {
      promo_name,
      phone,
      category,
      sub_category,
      // logo,
      promo_title,
      description,
      notification,
      // promo_img,
      lat_long,
      location_name,
      pincode,
    } = req.body;

    console.log(req.body, "body");

    // These come from multer/cloudinary upload
    const logoUrl = req.files?.logo?.[0]?.path || "";
    const promoImgUrl = req.files?.promo_img?.[0]?.path || "";

    const newPromo = await Promo.create({
      promo_name: promo_name || "",
      phone: phone || "",
      category: category || "",
      sub_category: sub_category || "",
      logo: logoUrl || "",
      promo_title: promo_title || "",
      description: description || "",
      notification: notification || "",
      promo_img: promoImgUrl || "",
      lat_long: lat_long || "",
      location_name: location_name || "",
      pincode: pincode || "",
    });

    res.status(201).json({
      message: "Promotion created successfully",
      data: newPromo,
    });
  } catch (error) {
    next(error);
  }
};
