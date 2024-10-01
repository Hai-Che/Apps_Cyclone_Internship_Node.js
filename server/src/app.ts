import express from "express";
import { initializeApp } from "./init";

const app = express();
initializeApp(app);

export default app;
