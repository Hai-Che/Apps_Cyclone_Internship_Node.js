"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const config_mongodb_1 = __importDefault(require("../configs/config.mongodb"));
const { host, port, name } = config_mongodb_1.default.db;
const MONGODB_URL = `mongodb://${host}:${port}/${name}`;
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        mongoose_1.default.set("debug", true);
        mongoose_1.default.set("debug", { color: true });
        mongoose_1.default
            .connect(MONGODB_URL)
            .then((_) => {
            console.log("Connect to mongodb successfully");
        })
            .catch((err) => console.log(err));
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new Database();
        }
        return this._instance;
    }
}
exports.instanceMongoDB = Database.getInstance();
//# sourceMappingURL=init.mongodb.js.map