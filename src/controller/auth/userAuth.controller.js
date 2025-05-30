import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation
import { JWT_SECRET } from "../../config/index.js"; // JWT secret from your config
import { AppError } from "../../middleware/errorHandler.js";
import User from "../../model/users.model.js"; // adjust path as needed
import chalk from "chalk"; // Import chalk for error styling
// import PromoPhoneNo from "../../model/promo/PromotionPhoneNo.model.js";

// Utility to generate a 10-digit referral code
const generateReferralCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "";

  // Generate 4 random letters
  for (let i = 0; i < 5; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate 4 random digits
  for (let i = 0; i < 5; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return code; // e.g., "ABCD1234"
};

// register user
export const userRegister = async (req, res, next) => {
  try {
    const { nick_name, phone, password, reffured_referral_id, hes_referral } =
      req.body;

    if (!nick_name || !phone || !password) {
      return next(new AppError(chalk.red.bold("All fields are required"), 400));
    }

    if (!/^\d{4}$/.test(password)) {
      return next(
        new AppError(chalk.red.bold("Password must be 4 digits"), 400)
      );
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return next(
        new AppError(chalk.red.bold("Phone number already registered"), 409)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referral_id = generateReferralCode();

    const newUser = await User.create({
      nick_name,
      phone,
      password: hashedPassword,
      referral_id,
      reffured_referral_id: reffured_referral_id || "",
      hes_referral,
    });

    res.status(201).json({
      message: "Successfully registered",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// user Login
export const userLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    // Validate inputs
    if (!phone || !password) {
      return next(new AppError(chalk.red.bold("All fields are required"), 400));
    }

    // Find user by phone
    const user = await User.findOne({ phone });

    if (!user) {
      return next(new AppError(chalk.red.bold("User not found"), 404));
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError(chalk.red.bold("Invalid credentials"), 401));
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d", // Optional: token expiry (recommended)
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        nick_name: user.nick_name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const checkPhoneNo = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return next(new AppError(chalk.red.bold("nomber not found"), 404));
    }
    const isPhoneNo = await User.findOne({ phone });
    if (isPhoneNo) {
      res.status(200).json({ message: "already store" ,exists :true});
    } else {
      res.status(404).json({ message: "not found" ,exists: false});
    }
  } catch (error) {
    next(error);
  }
};

export const displayAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.status(200).json({ message: "all users are", allUser });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    const { id } = req.params; // Fix typo: "parms" → "params"
    const profile = await User.findById(id); // Prefer `findById` for MongoDB ObjectId

    if (!profile) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "Profile retrieved successfully.", profile });
  } catch (error) {
    next(error);
  }
};
