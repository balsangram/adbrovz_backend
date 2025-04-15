import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
  BusinessName: {
    type: String,
  },
  ContactNumber: {
    type: String,
  },
  Category: {
    type: String,
  },
  SubCategory: {
    type: String,
  },
  Logo: {
    type: String,
  },
  ADTitle: {
    type: String,
  },
  Description: {
    type: String,
  },
  Notification: {
    type: String,
  },
  PosterImage: {
    type: String,
  },
  LatitudeLongitude: {
    type: String,
  },
  AdverticeLocalityName: {
    type: String,
  },
  PinCode: {
    type: Number,
  },
  AdvertiseRequest: {
    type: String,
    enum: ["accept", "reject", "review"],
    default: "review",
  },
  Listings: {
    type: String,
    enum: ["deleted", "reject", "review"],
    default: "review",
  },
  isContents: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // optional: adds createdAt & updatedAt fields
});

const Categorie = mongoose.model("Categorie", categorieSchema);

export default Categorie;
