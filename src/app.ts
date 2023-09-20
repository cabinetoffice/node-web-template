import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import * as config from "./config";

const app = express();

app.set("port", config.PORT);

app.use(helmet());
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", function(req, res) {
    res.send("Hello World");
});

export default app;
