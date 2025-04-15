import { Router } from "express";
import {
  adminLogin,
  adminRegester,
} from "../controller/auth/auth.controller.js";

const router = Router();

router.route("/register").post(adminRegester);
router.route("/login").post(adminLogin);

export default router; // ✅ Corrected
