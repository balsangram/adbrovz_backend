import express from "express";
import promoRoutes from "./src/routes/promoRoutes.js";
import { PORT } from "./src/config/index.js";
import cors from "cors";
import { dbConnect } from "./src/database/index.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/promo", promoRoutes);
dbConnect();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
