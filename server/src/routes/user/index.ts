import express from "express";
import userController from "../../controllers/user.controller";
import { asyncHandler } from "../../helper/asyncHandler";
import { authentication } from "../../auth/authUtils";
const router = express.Router();

router.use(authentication);
router.get("/user/:id", asyncHandler(userController.getUser));
router.put("/user", asyncHandler(userController.updateUser));
router.delete("/user/:id", asyncHandler(userController.deleteUser));

export default router;
