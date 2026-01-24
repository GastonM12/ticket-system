import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const ticketSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, default: uuidv4 },
    user: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    title: { type: String, required: true },
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
  },
);

ticketSchema.index({ id: 1, user: 1 });

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
