"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const access_controller_1 = __importDefault(require("../../controllers/access.controller"));
const asyncHandler_1 = require("../../helper/asyncHandler");
const authUtils_1 = require("../../auth/authUtils");
const router = express_1.default.Router();
router.post("/register", (0, asyncHandler_1.asyncHandler)(access_controller_1.default.register));
router.post("/login", (0, asyncHandler_1.asyncHandler)(access_controller_1.default.login));
router.post("/logout", authUtils_1.verifyToken, (0, asyncHandler_1.asyncHandler)(access_controller_1.default.logout));
router.post("/handleRefreshToken", authUtils_1.verifyRefreshToken, (0, asyncHandler_1.asyncHandler)(access_controller_1.default.handleRefreshToken));
exports.default = router;
//# sourceMappingURL=index.js.map