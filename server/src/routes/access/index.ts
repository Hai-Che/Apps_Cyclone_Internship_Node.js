import express from "express";
import accessController from "../../controllers/access.controller";
import { asyncHandler } from "../../helper/asyncHandler";
import { authentication } from "../../auth/authUtils";
const router = express.Router();

router.post("/register", asyncHandler(accessController.register));
router.post("/login", asyncHandler(accessController.login));
router.use(authentication);
router.post(
  "/handleRefreshToken",
  asyncHandler(accessController.handleRefreshToken)
);

export default router;
