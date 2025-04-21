import AppIcon from "../../model/admin/appIcon.model.js";
import Promotion from "../../model/promo/Promotion.model.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const ResetLoginPIN = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const addAppIcons = async (req, res, next) => {
  try {
    const files = req.files;
    // console.log("files.......", files);

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const uploadedIcons = {};

    for (const field in files) {
      const file = files[field][0];
      console.log("file", file);

      const result = await uploadToCloudinary(
        file.buffer,
        `adbrovz/icons/${field}`
      );
      uploadedIcons[field] = result.secure_url;
    }

    const savedIcons = new AppIcon(uploadedIcons);
    console.log("savedIcons", savedIcons);

    await savedIcons.save();

    res.status(200).json({
      message: "All icons uploaded and saved.",
      icons: uploadedIcons,
    });
  } catch (error) {
    console.error("🔥 Upload Error:", error);
    next(error);
  }
};

export const displayappIcons = async (req, res, next) => {
  try {
    const allIcons = await AppIcon.find();
    res.status(200).json({ message: "all images are display", allIcons });
  } catch (error) {
    next(error);
  }
};

// export const advertisementRequest = async (req, res) => {
//   try {
//     const currentAdminId = req.user.id;

//     // Get all promotions not created by this admin and not approved
//     const promotions = await Promotion.find({
//       requested_by: { $ne: currentAdminId },
//       request_status: { $ne: "approved" },
//     })
//       .populate("requested_by") // equivalent to with('user')
//       .sort({ updatedAt: -1 });

//     const req_count = promotions.filter(
//       (promo) => promo.request_status === "pending"
//     ).length;

//     const deleted_count = promotions.filter(
//       (promo) => promo.request_status === "delete"
//     ).length;

//     res.status(200).json({
//       advertise_reqs: promotions,
//       req_count,
//       deleted_count,
//     });
//   } catch (error) {
//     console.error("Error fetching advertisement requests:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
