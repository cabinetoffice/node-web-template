import express from "express";
import helmet from "helmet";

const app = express();
const port = 3000;

app.use(helmet());

app.get('/', function(req, res) {
    res.send('Hello World')
});

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`)
})