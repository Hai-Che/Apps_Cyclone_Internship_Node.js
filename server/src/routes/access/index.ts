import express from "express";
import AuthController from "../../controllers/auth.controller";
import { validateForm } from "../../middleware/validateForm";
const router = express.Router();

router.post("/register", validateForm, AuthController.register);

export default router;
