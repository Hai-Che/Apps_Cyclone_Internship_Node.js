import express from "express";
import accessRoute from "./access/index";
const router = express.Router();

router.use("/api", accessRoute);

export default router;
