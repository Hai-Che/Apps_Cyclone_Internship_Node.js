import app from "./src/app";
import "dotenv/config";
import "reflect-metadata";

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Terminate server"));
  process.exit(0);
});
