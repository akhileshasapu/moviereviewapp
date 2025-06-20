import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authrouter from './routes/auth.js';
import reviewrouter from './routes/reviews.js';
const app = express();
app.use(cors({
  origin: "https://your-vercel-url.vercel.app",
  credentials: true
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
