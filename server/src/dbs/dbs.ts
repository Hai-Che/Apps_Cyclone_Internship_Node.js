import { instanceMysql } from "./init.mysql";
// import {instanceMongoDB} from "./init.mongodb";
export const initializeDatabase = () => {
  instanceMysql;
};
