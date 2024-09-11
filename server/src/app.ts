import express from "express";
import mainRoute from "./routes/index";
import instanceMongoDB from "./dbs/init.mongodb";
import { NotFoundError } from "./core/error.response";
const app = express();
app.use(express.json());

instanceMongoDB;

app.use("/", mainRoute);

// Catch all 404 error middleware
app.use((req, res, next) => {
  const error = new NotFoundError("Not found");
  next(error);
});
// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});

export default app;
