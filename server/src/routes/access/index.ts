import express from "express";
import accessController from "../../controllers/access.controller";
import { asyncHandler } from "../../helper/asyncHandler";
import { verifyToken, verifyRefreshToken } from "../../auth/authUtils";
const router = express.Router();

router.post("/register", asyncHandler(accessController.register));
router.post("/login", asyncHandler(accessController.login));
router.post("/logout", verifyToken, asyncHandler(accessController.logout));
router.post(
  "/handleRefreshToken",
  verifyRefreshToken,
  asyncHandler(accessController.handleRefreshToken)
);

export default router;
