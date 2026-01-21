import express from "express";
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
const DB_URL =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/ticket-system-db-test"
    : process.env.DB_URL || "mongodb://localhost:27017/ticket-system";

app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(DB_URL).then(()=>{
    console.log("connected to mongoDB: "+DB_URL);
}).catch((err)=>{
    console.error(err);
})

app.get("/", (req, res) => {
  res.status(200).send("hellow word gaston si");
});

export default app;
