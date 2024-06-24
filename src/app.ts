import cors from "cors";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";

import coinsRouter from "./routes/coinsRoutes";
import userRouter from "./routes/userRoutes";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(`${process.env.API_URL}/coins`, coinsRouter);

app.use(`${process.env.API_URL}/user`, userRouter);

export default app;
