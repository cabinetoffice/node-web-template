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

app.get("/", function(req, res) {
    res.send("Hello World");
});

app.listen(config.PORT, () => {
    console.log(`Server is running http://localhost:${config.PORT}`);
});
