import express from "express";
import mainRoute from "./routes/index";
import { initializeDatabase } from "./dbs/dbs";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
const app = express();
app.use(express.json());

initializeDatabase();

app.use("/", mainRoute);

// Catch all 404 error middleware
app.use(notFoundHandler);
// Error handling middleware
app.use(errorHandler);

export default app;
