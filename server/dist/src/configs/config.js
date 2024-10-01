"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRepositories = exports.configureApp = void 0;
const express_1 = __importDefault(require("express"));
const typedi_1 = __importDefault(require("typedi"));
const routing_controllers_1 = require("routing-controllers");
const config_bullboard_1 = __importDefault(require("./config.bullboard"));
const init_mysql_1 = __importDefault(require("../dbs/init.mysql"));
const user_entity_1 = require("../entities/user.entity");
const userAdvance_entity_1 = require("../entities/userAdvance.entity");
const configureApp = (app) => {
    app.use(express_1.default.json());
    app.use("/api/admin/queues", config_bullboard_1.default.getRouter());
};
exports.configureApp = configureApp;
const configureRepositories = () => {
    const UserRepository = init_mysql_1.default.getRepository(user_entity_1.User).extend({});
    const UserAdvanceRepository = init_mysql_1.default.getRepository(userAdvance_entity_1.UserAdvance).extend({});
    typedi_1.default.set("UserRepository", UserRepository);
    typedi_1.default.set("UserAdvanceRepository", UserAdvanceRepository);
    (0, routing_controllers_1.useContainer)(typedi_1.default);
};
exports.configureRepositories = configureRepositories;
//# sourceMappingURL=config.js.map