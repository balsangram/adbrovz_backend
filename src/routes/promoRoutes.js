import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ msg: "hi" });
});
export default router;
