import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation
import { JWT_SECRET } from "../../config/index.js"; // JWT secret from your config
import { AppError } from "../../middleware/errorHandler.js";
import User from "../../model/users.model.js"; // adjust path as needed
import chalk from "chalk"; // Import chalk for error styling

// Admin Registration
export const adminRegester = async (req, res, next) => {
  try {
    console.log(req.body, "body");

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError(chalk.red.bold("All fields are required"), 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new AppError(chalk.red.bold("Email already registered"), 409)
      );
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Save new user with hashed password
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Successfully registered",
      admin: newAdmin,
    });
  } catch (error) {
    next(error); // Passes to error-handling middleware
  }
};

// Admin Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return next(new AppError(chalk.red.bold("All fields are required"), 400));
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError(chalk.red.bold("User not found"), 404));
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError(chalk.red.bold("Invalid credentials"), 401));
    }

    // Generate JWT token if login is successful
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      //   expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token, // Sending the generated token to the client
    });
  } catch (error) {
    next(error); // Passes to error-handling middleware
  }
};
