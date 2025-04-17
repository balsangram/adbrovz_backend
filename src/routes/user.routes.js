import { Router } from "express";
import {
  checkPhoneNo,
  displayAllUser,
  userLogin,
  userRegister,
  profile,
} from "../controller/auth/userAuth.controller.js";

const router = Router();

// Separate routes for register and login
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/checkPhone", checkPhoneNo);
router.get("/displayAllUser", displayAllUser);
router.get("/profile/:id", profile);

export default router;
