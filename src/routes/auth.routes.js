import { Router } from "express";
import {
  adminLogin,
  // adminRegester,
} from "../controller/auth/auth.controller.js";

const router = Router();

// Separate routes for register and login
// router.post("/register" , adminRegester);
router.post("/login", adminLogin);

export default router;
