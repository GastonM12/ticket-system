import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log(req.body);
    return res
      .status(400)
      .send({ error: "Name, email and password are required" });
  }
  let user = await User.findOne({
    email: email.toLowerCase(),
  });
  if (user) {
    res.status(400).send({ error: "User already exists" });
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    await user.save();
    const token = jwt.sign(
      {
        _id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res
      .header("Authorization", token)
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
        },
        token,
      });
  } catch (err) {
    return res.status(500).send({ error: "Error creating user" });
  }
});



router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!validatePassword) {
    return res.status(400).send({ error: "Invalid password" });
  }
  const token = jwt.sign(
    {
      _id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.header("Authorization", token).status(200).json({
    message: "User logged in successfully",
    user,
    token,
  });
});

export default router;
