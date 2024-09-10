"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const init_mongodb_1 = __importDefault(require("./dbs/init.mongodb"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
init_mongodb_1.default;
app.use("/", index_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
exports.default = app;
//# sourceMappingURL=app.js.map