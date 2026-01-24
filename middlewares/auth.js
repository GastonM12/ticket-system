import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided" });
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(400).send({ error: "Invalid token" });
  }
}
