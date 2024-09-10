import express from "express";
import authRouter from "./access/index";
const router = express.Router();

router.use("/api", authRouter);

export default router;
