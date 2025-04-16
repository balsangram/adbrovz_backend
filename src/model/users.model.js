import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    photo: { type: String },
    nick_name: { type: String },
    name: { type: String },
    phone: { type: String },
    password: { type: String },
    // ===
    
    // ===
    date_of_birth: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    blood_group: { type: String },
    residence_address: { type: String },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    lat_long: { type: String },
    email: { type: String, default: "" },
    customer_id: { type: String },

    // Company profile related
    company_profile: { type: String },
    representative_name: { type: String },
    company_name: { type: String },
    business_number: { type: String },
    representative_dob: { type: String },
    representative_gender: { type: String },
    representative_blood_group: { type: String },
    office_address: { type: String },
    office_pincode: { type: String },
    office_city: { type: String },
    office_state: { type: String },
    office_country: { type: String },
    business_latln: { type: String },
    business_email: { type: String },
    profession: { type: String },

    // Role & privacy settings
    role: { type: String, default: "user" }, // could be 'user', 'admin', etc.
    phone_visibility: { type: Boolean, default: true },
    name_visibility: { type: Boolean, default: true },
    date_of_birth_visibility: { type: Boolean, default: true },
    gender_visibility: { type: Boolean, default: true },
    blood_group_visibility: { type: Boolean, default: true },

    // Referral & timestamps
    referral_id: { type: String },
    reffured_referral_id: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
