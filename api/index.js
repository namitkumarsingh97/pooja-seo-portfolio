/* eslint-env node */
/* global process */
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import postsRouter from "../server/src/routes/posts.js";
import { connectDB } from "../server/src/config/db.js";
import serverless from "serverless-http";

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

// Ensure DB connection happens only once per cold start
let isDBConnected = false;

async function initDB() {
  if (!isDBConnected) {
    await connectDB();
    isDBConnected = true;
  }
}
await initDB();

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`API running on http://localhost:${PORT}`);
//   });
// });

// DO NOT USE app.listen() on Vercel
// Instead export the handler
const handler = serverless(app);

export { handler };
