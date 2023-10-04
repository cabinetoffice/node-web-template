import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import router from "./routes";
import { configureNunjucks } from "./config/nunjucks";

import { errorHandler, errorNotFound } from "./controllers/error.controller";

import { setHelmet } from "./middleware/helmet.middleware";
import { setNonce } from "./middleware/nonce.middleware";
import { setCors } from "./middleware/cors.middleware";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(setNonce);
app.use(setHelmet);
app.use(setCors);

const viewPath = path.join(__dirname, 'views');
configureNunjucks(app, viewPath);

app.set("views", viewPath);
app.set("view engine", "html");

app.use("/", router);

app.use(errorNotFound);
app.use(errorHandler);

export default app;
