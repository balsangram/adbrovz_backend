import mongoose, { Schema } from "mongoose";

const appIconsSchem = Schema({
  promo_img: {
    type: String,
  },
  bazaar_img: {
    type: String,
  },
  assist_img: {
    type: String,
  },
  shortcut_img: {
    type: String,
  },
});
const AppIcon = mongoose.model("AppIcon", appIconsSchem);
export default AppIcon;
