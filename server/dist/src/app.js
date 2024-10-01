"use strict";
// import express from "express";
// import Container from "typedi";
// import { initializeDatabase } from "./dbs/dbs";
// import { useContainer, useExpressServer } from "routing-controllers";
// import { UserController } from "./modules/user/user.controller";
// import { AccessController } from "./modules/access/access.controller";
// import { HttpErrorHandler } from "./middleware/errorHandler";
// import BullBoardConfig from "./configs/config.bullboard";
// import MysqlDataSource from "./dbs/init.mysql";
// import { User } from "./entities/user.entity";
// import { UserAdvance } from "./entities/userAdvance.entity";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export const UserRepository = MysqlDataSource.getRepository(User).extend({});
// export const UserAdvanceRepository = MysqlDataSource.getRepository(
//   UserAdvance
// ).extend({});
// Container.set("UserRepository", UserRepository);
// Container.set("UserAdvanceRepository", UserAdvanceRepository);
// useContainer(Container);
// const app = express();
// app.use(express.json());
// app.use("/api/admin/queues", BullBoardConfig.getRouter());
// initializeDatabase();
// useExpressServer(app, {
//   routePrefix: "/api",
//   defaultErrorHandler: false,
//   controllers: [UserController, AccessController],
//   middlewares: [HttpErrorHandler],
// });
// export default app;
// src/app.ts
const express_1 = __importDefault(require("express"));
const init_1 = require("./init");
const app = (0, express_1.default)();
(0, init_1.initializeApp)(app);
exports.default = app;
//# sourceMappingURL=app.js.map