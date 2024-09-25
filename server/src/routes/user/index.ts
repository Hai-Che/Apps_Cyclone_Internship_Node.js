import express from "express";
import userController from "../../controllers/user.controller";
import { asyncHandler } from "../../helper/asyncHandler";
import { verifyToken } from "../../auth/authUtils";
const router = express.Router();

router.use(verifyToken);
router.get("/user/:id", asyncHandler(userController.getUser));
router.put("/user", asyncHandler(userController.updateUser));
router.delete("/user/:id", asyncHandler(userController.deleteUser));

export default router;
