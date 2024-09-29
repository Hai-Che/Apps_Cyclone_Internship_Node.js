"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typedi_1 = __importDefault(require("typedi"));
const dbs_1 = require("./dbs/dbs");
const routing_controllers_1 = require("routing-controllers");
const user_controller_1 = require("./modules/user/user.controller");
const access_controller_1 = require("./modules/access/access.controller");
const errorHandler_1 = require("./middleware/errorHandler");
const config_bullboard_1 = __importDefault(require("./configs/config.bullboard"));
(0, routing_controllers_1.useContainer)(typedi_1.default);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/admin/queues", config_bullboard_1.default.getRouter());
(0, dbs_1.initializeDatabase)();
(0, routing_controllers_1.useExpressServer)(app, {
    routePrefix: "/api",
    defaultErrorHandler: false,
    controllers: [user_controller_1.UserController, access_controller_1.AccessController],
    middlewares: [errorHandler_1.HttpErrorHandler],
});
exports.default = app;
//# sourceMappingURL=app.js.map