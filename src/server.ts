import * as http from "http";
import * as config from "./config";
import app from "./app";

app.set("port", config.PORT);

const server = http.createServer(app);

app.listen(config.PORT, () => {
    console.log(`Server is running http://localhost:${config.PORT}`);
});

server.on("error", onError);

function onError(error: any) {
    console.error(`Error: ${error.message}`);
    // TODO: More specific error catching + logging in future
}
