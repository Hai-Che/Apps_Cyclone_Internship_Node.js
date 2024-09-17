"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
// import instanceMongoDB from "./dbs/init.mongodb";
const init_mysql_1 = require("./dbs/init.mysql");
const error_response_1 = require("./core/error.response");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// instanceMongoDB;
init_mysql_1.instanceMysql;
app.use("/", index_1.default);
// Catch all 404 error middleware
app.use((req, res, next) => {
    const error = new error_response_1.NotFoundError("Not found");
    next(error);
});
// Error handling middleware
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal Server Error",
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map