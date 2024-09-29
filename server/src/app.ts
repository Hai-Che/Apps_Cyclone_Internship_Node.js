import express from "express";
import Container from "typedi";
import { initializeDatabase } from "./dbs/dbs";
import { useContainer, useExpressServer } from "routing-controllers";
import { UserController } from "./modules/user/user.controller";
import { AccessController } from "./modules/access/access.controller";
import { HttpErrorHandler } from "./middleware/errorHandler";
import BullBoardConfig from "./configs/config.bullboard";
useContainer(Container);
const app = express();
app.use(express.json());
app.use("/api/admin/queues", BullBoardConfig.getRouter());
initializeDatabase();
useExpressServer(app, {
  routePrefix: "/api",
  defaultErrorHandler: false,
  controllers: [UserController, AccessController],
  middlewares: [HttpErrorHandler],
});

export default app;
