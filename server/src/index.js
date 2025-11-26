/* eslint-env node */
/* global process */
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import postsRouter from "./routes/posts.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Pooja SEO Portfolio API" });
});

app.use("/api/posts", postsRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
});

