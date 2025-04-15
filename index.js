import express from "express";
import promoRoutes from "./src/routes/promo.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import { PORT } from "./src/config/index.js";
import cors from "cors";
import { dbConnect } from "./src/database/index.js";
import chalk from "chalk";
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "hi" });
});
app.use("/api/auth", authRouter);
app.use("/api/promo", promoRoutes);

dbConnect();
app.listen(PORT, () =>
  console.log(`Server running on port ${chalk.blue(PORT)}`)
);
