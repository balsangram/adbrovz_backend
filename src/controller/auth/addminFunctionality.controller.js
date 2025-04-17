import AppIcon from "../../model/admin/appIcon.model.js";
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
