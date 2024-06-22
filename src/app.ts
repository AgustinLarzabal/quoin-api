import cors from "cors";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";

import coinsRouter from "./routes/coinsRoutes";

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/coins", coinsRouter);

export default app;
