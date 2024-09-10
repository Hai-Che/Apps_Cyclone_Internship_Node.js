import express from "express";
import mainRoute from "./routes/index";
import instanceMongoDB from "./dbs/init.mongodb";
const app = express();
app.use(express.json());

instanceMongoDB;

app.use("/", mainRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
