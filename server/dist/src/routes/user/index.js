"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const asyncHandler_1 = require("../../helper/asyncHandler");
const authUtils_1 = require("../../auth/authUtils");
const router = express_1.default.Router();
router.use(authUtils_1.verifyToken);
router.get("/user/:id", (0, asyncHandler_1.asyncHandler)(user_controller_1.default.getUser));
router.put("/user", (0, asyncHandler_1.asyncHandler)(user_controller_1.default.updateUser));
router.delete("/user/:id", (0, asyncHandler_1.asyncHandler)(user_controller_1.default.deleteUser));
exports.default = router;
//# sourceMappingURL=index.js.map