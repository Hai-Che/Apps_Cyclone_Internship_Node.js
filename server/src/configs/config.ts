import express from "express";
import Container from "typedi";
import { useContainer } from "routing-controllers";
import BullBoardConfig from "./config.bullboard";
import MysqlDataSource from "../dbs/init.mysql";
import { User } from "../entities/user.entity";
import { UserAdvance } from "../entities/userAdvance.entity";

export const configureApp = (app: express.Application) => {
  app.use(express.json());
  app.use("/api/admin/queues", BullBoardConfig.getRouter());
};

export const configureRepositories = () => {
  const UserRepository = MysqlDataSource.getRepository(User).extend({});
  const UserAdvanceRepository = MysqlDataSource.getRepository(
    UserAdvance
  ).extend({});
  Container.set("UserRepository", UserRepository);
  Container.set("UserAdvanceRepository", UserAdvanceRepository);
  useContainer(Container);
};
