import { Router } from "express";
import { createPromotion } from "../controller/promo/promotion.controller.js";
import upload from "../middleware/multer.middleware.js";
import {
  AcceptAdvertisement,
  newAdvertisement,
  RejectedAdvertisement,
  ReviewAdvertisement,
} from "../controller/promo/advertisement.controller.js";

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
router.get("/acceptAdvertisement", AcceptAdvertisement);
router.get("/rejectedAdvertisement", RejectedAdvertisement);
router.get("/reviewAdvertisement", ReviewAdvertisement);

export default router;
