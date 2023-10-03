import express from "express";
import cookieParser from "cookie-parser";
import * as path from "path";
import * as nunjucks from "nunjucks";

import router from "./routes";
import * as config from "./config";
import { errorHandler, errorNotFound } from "./controllers/error.controller";

const app = express();

const nunjucksEnv = nunjucks.configure([
    "src/views",
    "node_modules/govuk-frontend",
    "node_modules/govuk-frontend/components"
], {
    autoescape: true,
    express: app,
});
nunjucksEnv.addGlobal("CDN_HOST", config.CDN_HOST);

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use("/", router);

app.use(errorNotFound);
app.use(errorHandler);

export default app;
