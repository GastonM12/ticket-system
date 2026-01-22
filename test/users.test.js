import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import User from "../model/user.js";

describe("User API",() => {
  beforeAll(async () => {
    await User.deleteMany();
  });
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
  test("create a nwe user", async() => {
     const response = await request(app)
     .post("/api/users/signup")
     .send({
        name:"gaston",
        email:'test@test',
        password:'12345678999',
        role:'user'
     })

     expect(response.status).toBe(201);
     expect(response.body).toHaveProperty("user");
     expect(response.body).toHaveProperty("token");

  });
});
