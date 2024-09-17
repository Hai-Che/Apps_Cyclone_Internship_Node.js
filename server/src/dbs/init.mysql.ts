import "dotenv/config";
import configMysql from "../configs/config.mysql";
import { DataSource, DataSourceOptions } from "typeorm";

const { host, port, name, username, password } = configMysql.db;

export const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: `${host}`,
  port: parseInt(`${port}`),
  username: `${username}`,
  password: `${password}`,
  database: `${name}`,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/src/dbs/migrations/*.js"],
  synchronize: false,
};

const MysqlDataSource = new DataSource(dataSourceOptions);

class Database {
  private static _instance: Database;
  constructor() {
    this.connect();
  }

  connect() {
    MysqlDataSource.initialize()
      .then(() => {
        console.log("Connect to mysqldb successfully");
      })
      .catch((error) => console.log(error));
  }
  static getInstance(): Database {
    if (!this._instance) {
      this._instance = new Database();
    }
    return this._instance;
  }
}
const instanceMysql = Database.getInstance();

export { instanceMysql };
export default MysqlDataSource;
