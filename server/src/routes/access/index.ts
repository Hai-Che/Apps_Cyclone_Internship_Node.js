import express from "express";
import accessController from "../../controllers/access.controller";
import { validateForm } from "../../auth/validateForm";
import { asyncHandler } from "../../helper/asyncHandler";
const router = express.Router();

router.post("/register", validateForm, asyncHandler(accessController.register));

export default router;
