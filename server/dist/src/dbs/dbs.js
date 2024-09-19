"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const init_mysql_1 = require("./init.mysql");
// import {instanceMongoDB} from "./init.mongodb";
const initializeDatabase = () => {
    init_mysql_1.instanceMysql;
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=dbs.js.map