"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_1 = require("./init");
const app = (0, express_1.default)();
(0, init_1.initializeApp)(app);
exports.default = app;
//# sourceMappingURL=app.js.map