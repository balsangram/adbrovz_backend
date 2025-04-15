import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token missing or invalid." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next(); // Move to next middleware or route
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden. Invalid or expired token." });
  }
};

module.exports = verifyToken;
