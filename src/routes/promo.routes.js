import { Router } from "express";
import { createPromotion } from "../controller/promo/promotion.controller.js";
import upload from "../middleware/multer.middleware.js";
import { newAdvertisement } from "../controller/promo/advertisement.controller.js";

const router = Router();

router.post(
  "/addPromo",
  upload.fields([
    { name: "promo_img", maxCount: 1 }, // field for promo image
    { name: "logo", maxCount: 1 }, // field for logo image
  ]),
  createPromotion
);
//advertisement
router.get("/newAdvertisement", newAdvertisement);

export default router;
