"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ioredis_1 = __importDefault(require("ioredis"));
const config_redis_1 = __importDefault(require("../configs/config.redis"));
const { host, port } = config_redis_1.default.db;
const redisClient = new ioredis_1.default({
    host: host || "localhost",
    port: port || 6379,
});
redisClient.on("connect", () => {
    console.log("Connect to Redis successfully!");
});
redisClient.on("error", (err) => {
    console.log("Failed to connect to Redis!", err);
});
exports.default = redisClient;
//# sourceMappingURL=init.redis.js.map