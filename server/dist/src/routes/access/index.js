"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const access_controller_1 = __importDefault(require("../../controllers/access.controller"));
const asyncHandler_1 = require("../../helper/asyncHandler");
const router = express_1.default.Router();
router.post("/register", (0, asyncHandler_1.asyncHandler)(access_controller_1.default.register));
exports.default = router;
//# sourceMappingURL=index.js.map