const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 8080,
  },
  db: {
    host: "localhost",
    port: 6379,
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 8080,
  },
  db: {
    host: "localhost",
    port: 6379,
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
export default config[env];
