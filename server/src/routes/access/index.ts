import express from "express";
import accessController from "../../controllers/access.controller";
import { asyncHandler } from "../../helper/asyncHandler";
const router = express.Router();

router.post("/register", asyncHandler(accessController.register));

export default router;
