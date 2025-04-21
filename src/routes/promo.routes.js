import { Router } from "express";
import {
  createPromotion,
  drafPromotion,
} from "../controller/promo/promotion.controller.js";
import upload from "../middleware/multer.middleware.js";
import {
  AcceptAdvertisement,
  dashBoardDetails,
  featuredDetails,
  newAdvertisement,
  RejectedAdvertisement,
  ReviewAdvertisement,
} from "../controller/promo/advertisement.controller.js";
import { verifyToken } from "../middleware/authToken.midleware.js";

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

// featured
router.post("/featured_details", verifyToken, featuredDetails);
// discover
router.get("/dashboard_details", verifyToken, dashBoardDetails);

// drafPromotion
router.post(
  "/draf_promotion",
  upload.fields([{ name: "promo_img", maxCount: 1 }]),
  drafPromotion
);
export default router;

