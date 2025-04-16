import mongoose, { Schema } from "mongoose";

const promoPhoneNoSchema = new Schema({
  phone: {
    type: String,
    require: true,
    uniqu: true,
  },
});

const PromoPhoneNo = mongoose.model("PromoPhoneNo", promoPhoneNoSchema);
export default PromoPhoneNo;
