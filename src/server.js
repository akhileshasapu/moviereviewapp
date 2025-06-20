import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authrouter from './routes/auth.js';
import reviewrouter from './routes/reviews.js';
const app = express();
const allowedOrigins = [
  "https://moviebuzzreviewwebsite.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://akhileshasapu2004:Akhileshasapu@cluster0.nczizjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log("error is ", err);
  });

  app.use("/api/auth",authrouter)
  app.use("/api/reviews",reviewrouter)
const port = 5000;
app.listen(port, () => console.log(`server listening at ${port}`));
