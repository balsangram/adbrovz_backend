import { Router } from "express";
import {
  adminLogin,
  // adminRegester,
} from "../controller/auth/auth.controller.js";
import {
  addAppIcons,
  displayappIcons,
  ResetLoginPIN,
} from "../controller/auth/addminFunctionality.controller.js";
import upload from "../middleware/multer.middleware.js";
import { verifyToken } from "../middleware/authToken.midleware.js";

const router = Router();

// Separate routes for register and login
// router.post("/register" , adminRegester);
router.post("/login", adminLogin);

router.post(
  "/addAllImages",

  upload.fields([
    { name: "promo_img", maxCount: 1 },
    { name: "bazaar_img", maxCount: 1 },
    { name: "assist_img", maxCount: 1 },
    { name: "shortcut_img", maxCount: 1 },
  ]),
  addAppIcons
);

router.get("/displayAllIcons", verifyToken, displayappIcons);

router.post("/reset_login_PIN", ResetLoginPIN);

// router.get("/advertisement-requests", verifyToken, advertisementRequest);

export default router;
