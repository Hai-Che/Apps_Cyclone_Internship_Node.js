"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceMysql = exports.dataSourceOptions = void 0;
require("dotenv/config");
const config_mysql_1 = __importDefault(require("../configs/config.mysql"));
const typeorm_1 = require("typeorm");
const { host, port, name, username, password } = config_mysql_1.default.db;
exports.dataSourceOptions = {
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
const MysqlDataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        MysqlDataSource.initialize()
            .then(() => {
            console.log("Connect to MysqlDB successfully");
        })
            .catch((error) => console.log(error));
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new Database();
        }
        return this._instance;
    }
}
exports.instanceMysql = Database.getInstance();
exports.default = MysqlDataSource;
//# sourceMappingURL=init.mysql.js.map