import { Router } from "express";
import {
  userLogin,
  userRegister,
} from "../controller/auth/userAuth.controller.js";

const router = Router();

// Separate routes for register and login
router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
