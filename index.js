import express from "express";
import promoRoutes from "./src/routes/promo.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import userAuthRouter from "./src/routes/user.routes.js";
import { PORT } from "./src/config/index.js";
import cors from "cors";
import { dbConnect } from "./src/database/index.js";
import chalk from "chalk";
import errorHandler from "./src/middleware/errorHandler.js";
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "Welcome to the Adbrovz API server 🚀" });
});

app.use("/api/auth", authRouter);
app.use("/api/userAuth", userAuthRouter);
app.use("/api/promo", promoRoutes);

// Error handler
app.use(errorHandler);

dbConnect();
app.listen(PORT, () =>
  console.log(`Server running on port ${chalk.blue(PORT)}`)
);
