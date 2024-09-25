import "dotenv/config";
import Redis from "ioredis";
import configRedis from "../configs/config.redis";

const { host, port } = configRedis.db;

const redisClient = new Redis({
  host: host || "localhost",
  port: port || 6379,
});

redisClient.on("connect", () => {
  console.log("Connect to Redis successfully!");
});

redisClient.on("error", (err) => {
  console.log("Failed to connect to Redis!", err);
});

export default redisClient;
