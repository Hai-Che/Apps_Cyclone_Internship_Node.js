"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const validateForm_1 = require("../../middleware/validateForm");
const router = express_1.default.Router();
router.post("/register", validateForm_1.validateForm, auth_controller_1.default.register);
exports.default = router;
//# sourceMappingURL=index.js.map