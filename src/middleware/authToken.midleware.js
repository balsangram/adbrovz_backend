import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure this env var exists
    req.user = decoded; // Attach user info to request
    next(); // Move to next middleware/controller
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
