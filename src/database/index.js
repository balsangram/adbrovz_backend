import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "../config/index.js";
import chalk from "chalk";

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log(
      `Database connected to host:${chalk.blue(conn.connection.host)}`
    );
  } catch (error) {
    console.log(`Error: ${chalk.bgRed.bold(error)}`);
  }
};
