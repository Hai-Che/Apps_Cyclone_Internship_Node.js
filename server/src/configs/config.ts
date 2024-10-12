import express from "express";
import Container from "typedi";
import { useContainer } from "routing-controllers";
import BullBoardConfig from "./config.bullboard";
import MysqlDataSource from "../dbs/init.mysql";
import { User } from "../entities/user.entity";
import { UserAdvance } from "../entities/userAdvance.entity";
import { Post } from "../entities/post.entity";
import { Comment } from "../entities/comment.entity";

export const configureApp = (app: express.Application) => {
  app.use(express.json());
  app.use("/api/admin/queues", BullBoardConfig.getRouter());
};

export const configureRepositories = () => {
  const UserRepository = MysqlDataSource.getRepository(User).extend({});
  const UserAdvanceRepository = MysqlDataSource.getRepository(
    UserAdvance
  ).extend({});
  const PostRepository = MysqlDataSource.getRepository(Post).extend({});
  const CommentRepository = MysqlDataSource.getRepository(Comment).extend({});

  Container.set("UserRepository", UserRepository);
  Container.set("UserAdvanceRepository", UserAdvanceRepository);
  Container.set("PostRepository", PostRepository);
  Container.set("CommentRepository", CommentRepository);
  useContainer(Container);
};
