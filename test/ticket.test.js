import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import User from "../model/user.js";
import Ticket from "../model/ticket.js";

describe("Tickets API", () => {
  let token;

  beforeAll(async () => {
    await Ticket.deleteMany();
    await User.deleteMany();
    const response = await request(app).post("/api/users/signup").send({
      name: "gaston",
      email: "test@test",
      password: "12345678999",
      role: "user",
    });
    token = response.body.token;
  });

  beforeEach(async () => {
    await Ticket.deleteMany();
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
  test("create a new ticket", async () => {
    const response = await request(app).post("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Ticket",
        description: "This is a test ticket",
        priority: "high",
        status: "open",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("newTicket");

  });
});
