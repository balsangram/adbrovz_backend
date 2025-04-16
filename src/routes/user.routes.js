import { Router } from "express";
import {
  checkPhoneNo,
  userLogin,
  userRegister,
} from "../controller/auth/userAuth.controller.js";

const router = Router();

// Separate routes for register and login
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/checkPhone", checkPhoneNo);

export default router;
