"use strict";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 8080,
  },
  db: {
    host: process.env.DEV_DBS_HOST || "localhost",
    port: process.env.DEV_DBS_PORT || 3306,
    name: process.env.DEV_DBS_NAME || "appsCycloneIntern",
    username: process.env.DEV_DBS_USERNAME || "root",
    password: process.env.DEV_DBS_PASSWORD || "123456",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 8080,
  },
  db: {
    host: process.env.PRO_DBS_HOST || "localhost",
    port: process.env.PRO_DBS_PORT || 3306,
    name: process.env.PRO_DBS_NAME || "appsCycloneIntern",
    username: process.env.PRO_DBS_USERNAME || "root",
    password: process.env.PRO_DBS_PASSWORD || "123456",
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
export default config[env];
