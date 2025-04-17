import mongoose, { Schema } from "mongoose";

const promotionSchema = new Schema(
  {
    code: { type: String },
    promo_name: { type: String },
    phone: { type: String },
    category: { type: String },
    sub_category: { type: String },
    logo: { type: String },
    promo_title: { type: String },
    description: { type: String },
    notification: { type: String },
    promo_img: { type: String },
    promo_img_url: { type: String },
    pincode: { type: String },
    lat_long: { type: String },
    location_name: { type: String },
    icon_ex: { type: String },
    icon_in: { type: String },
    icon_ex_link: { type: String },
    icon_in_link: { type: String },
    from_date_time: { type: Date },
    to_date_time: { type: Date },
    totalcost: { type: Number },

    vs_public: { type: Boolean, default: false },
    vs_featured: { type: Boolean, default: false },
    vs_reappear: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    business_name: { type: String },
    email: { type: String },
    advertisement_type: {
      type: String,
      enum: ["Accept", "Reject", "Review", ""],
      default: "",
    },

    // request_status: {
    //   type: Number,
    //   enum: [0, 1, 2, 3],
    //   default: 0,
    // },
    request_status: {
      type: String,
      enum: ["pending", "approved", "rejected", "delete"],
      default: "pending",
    },
    expiry_status: { type: Boolean, default: false },
    requested_by: { type: Schema.Types.ObjectId, ref: "User" },
    number_of_days: { type: Number },
    admin_note: { type: String },
    refund_status: { type: Boolean, default: false },
    log_id: { type: String },
    requested_on: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

export default Promotion;
