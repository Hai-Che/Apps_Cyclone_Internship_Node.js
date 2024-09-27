import express from "express";
import accessRoute from "./access/index";
import userRoute from "./user/index";
import queueRoute from "./queue";
const router = express.Router();

router.use("/admin/queues", queueRoute.getRouter());
router.use("/", accessRoute);
router.use("/", userRoute);

export default router;
