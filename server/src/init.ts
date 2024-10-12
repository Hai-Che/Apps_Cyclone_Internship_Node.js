import { initializeDatabase } from "./dbs/dbs";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./modules/user/user.controller";
import { AccessController } from "./modules/access/access.controller";
import { HttpErrorHandler } from "./middleware/errorHandler";
import express from "express";
import { configureApp, configureRepositories } from "./configs/config";
import { PostController } from "./modules/post/post.controller";
import { CommentController } from "./modules/comment/comment.controller";

export const initializeApp = (app: express.Application) => {
  configureApp(app);
  configureRepositories();
  initializeDatabase();

  useExpressServer(app, {
    routePrefix: "/api",
    defaultErrorHandler: false,
    controllers: [
      UserController,
      AccessController,
      PostController,
      CommentController,
    ],
    middlewares: [HttpErrorHandler],
  });
};
