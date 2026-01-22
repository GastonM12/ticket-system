import express from "express";
import Ticket from "../model/ticket.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admind.js"; // Corregido: asumí que 'admind' era un error tipográfico
import buildFilter from "../middlewares/filter.js";
import pagination from "../middlewares/pagination.js";
import ticketSchema from "../validations/ticketValidation.js";

const router = express.Router();

router.get("/", [buildFilter, pagination(Ticket)], async (req, res) => {
  res.status(200).json(req.paginatedResult);
});

router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
 const {error} = ticketSchema.validate(req.body);
   if(error){
    return res.status(400).json({error:error.details[0].message})
   }
)
  const ticket = new Ticket({
    user: req.user._id,
    title: req.body.title,
    description: req.body.description || req.body.descripcion, // Acepta ambos nombres
    priority: req.body.priority,
    status: req.body.status,
  });

  try {
    const newTicket = await ticket.save();

    res.status(201).json({ newTicket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
