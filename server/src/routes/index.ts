import express from "express";
import accessRoute from "./access/index";
import userRoute from "./user/index";
const router = express.Router();

router.use("/api", accessRoute);
router.use("/api", userRoute);

export default router;
