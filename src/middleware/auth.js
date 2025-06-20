import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(" JWT_SECRET not loaded from .env");
  process.exit(1);
}

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token received:", req.headers["authorization"]);
  console.log("JWT_SECRET is:", JWT_SECRET);

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // e.g., { _id, email, username }
    next();
  } catch (err) {
    console.log("The error is:", err);
    return res.status(403).json({ message: "Access Denied: Invalid token" });
  }
}

export default auth;
