import express from "express";
import "dotenv/config";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("hellow word gaston si")
})

export default app;