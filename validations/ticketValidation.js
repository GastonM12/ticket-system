import joi from "joi";

const ticketSchema = joi.object({
  user: joi.string().required(),
  title: joi.string().min(3).required(),
  description: joi.string().required(),
  priority: joi.string().valid("low", "medium", "high").required(),
  status: joi.string().valid("open", "in progress", "closed").required(),
});
export default ticketSchema;