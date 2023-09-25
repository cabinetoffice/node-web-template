import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import router from "./routes";
import { errorHandler, errorNotFound } from "./controllers/error.controller";

const app = express();

app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.use(errorNotFound);
app.use(errorHandler);

export default app;
