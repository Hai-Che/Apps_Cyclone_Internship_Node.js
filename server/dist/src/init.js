"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
const dbs_1 = require("./dbs/dbs");
const routing_controllers_1 = require("routing-controllers");
const user_controller_1 = require("./modules/user/user.controller");
const access_controller_1 = require("./modules/access/access.controller");
const errorHandler_1 = require("./middleware/errorHandler");
const config_1 = require("./configs/config");
const initializeApp = (app) => {
    (0, config_1.configureApp)(app);
    (0, config_1.configureRepositories)();
    (0, dbs_1.initializeDatabase)();
    (0, routing_controllers_1.useExpressServer)(app, {
        routePrefix: "/api",
        defaultErrorHandler: false,
        controllers: [user_controller_1.UserController, access_controller_1.AccessController],
        middlewares: [errorHandler_1.HttpErrorHandler],
    });
};
exports.initializeApp = initializeApp;
//# sourceMappingURL=init.js.map