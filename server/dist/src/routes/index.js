"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./access/index"));
const index_2 = __importDefault(require("./user/index"));
const queue_1 = __importDefault(require("./queue"));
const router = express_1.default.Router();
router.use("/admin/queues", queue_1.default.getRouter());
router.use("/", index_1.default);
router.use("/", index_2.default);
exports.default = router;
//# sourceMappingURL=index.js.map