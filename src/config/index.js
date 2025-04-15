import dotenv from "dotenv";

dotenv.config();

export const { PORT, MONGODB_CONNECTION_STRING, JWT_SECRET } = process.env;
