import mongoose from "mongoose";
import "dotenv/config";
import configMongodb from "../configs/config.mongodb";

const { host, port, name } = configMongodb.db;
const MONGODB_URL = `mongodb://${host}:${port}/${name}`;

class Database {
  private static _instance: Database;
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });
    mongoose
      .connect(MONGODB_URL)
      .then((_) => {
        console.log("Connect to mongodb successfully");
      })
      .catch((err) => console.log(err));
  }
  static getInstance(): Database {
    if (!this._instance) {
      this._instance = new Database();
    }
    return this._instance;
  }
}
export const instanceMongoDB = Database.getInstance();
