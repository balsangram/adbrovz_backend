// src/middleware/errorHandler.js
import chalk from "chalk";

// Custom error class to handle different status codes and messages
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Custom flag for operational errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    // Custom error handling for operational errors
    console.error(`${chalk.red.bold("🔥 Operational Error:", err.stack)}`);
  } else {
    // Handling unknown errors
    console.error(`${chalk.red.bold("🔥 Unknown Error:", err.stack)}`);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Expose stack trace only in development
  });
};

export default errorHandler;
export { AppError };
