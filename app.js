import express from "express";
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";
import usersRoutes from "./routes/usersRoutes.js";
import ticketsRoutes from "./routes/ticketsRoutes.js";

const app = express();
const DB_URL =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/ticket-system-db-test"
    : process.env.DB_URL || "mongodb://localhost:27017/ticket-system";

app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to mongoDB: " + DB_URL);
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.use("/api/users", usersRoutes);
app.use("/api/tickets", ticketsRoutes)

export default app;
