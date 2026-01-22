import express from "express";
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/usersRoutes.js";
import ticketRouter from "./routes/ticketsRoutes.js";
import error from "./middlewares/error.js";

// Importa tus routers aquí (asegúrate de que los archivos existan)
// import userRouter from "./routes/user.routes.js";
// import ticketRouter from "./routes/ticket.routes.js";

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

// Registra las rutas con el prefijo /api
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.get("/", (req, res) => {

  res.status(200).send("hellow word gaston si");
});
app.use(error);


export default app;
