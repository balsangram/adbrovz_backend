import mongoose, { Schema } from "mongoose";

const drafPromotionSchema = new Schema(
  {
    promo_title: { type: String },
    description: { type: String },
    notification: { type: String },
    promo_img: { type: String },
    business_name: { type: String },
    location_name: { type: String },
    pincode: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

const DrafPromotion = mongoose.model("DrafPromotion", drafPromotionSchema);

export default DrafPromotion;
