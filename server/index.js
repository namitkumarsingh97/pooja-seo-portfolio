import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import postsRouter from "./src/routes/posts.js";
import adminRouter from "./src/routes/admin.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();

const allowedOrigins = process.env.CORS_ALLOW_ORIGINS
  ? process.env.CORS_ALLOW_ORIGINS.split(",").map((o) => o.trim())
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Pooja SEO Portfolio API" });
});

app.use("/api/posts", postsRouter);
app.use("/api/admin", adminRouter);

export default app;
