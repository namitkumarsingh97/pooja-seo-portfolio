/* eslint-env node */
/* global process */
import express from "express";
import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", listPosts);
router.get("/:slug", getPost);

// Admin guard middleware
const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  if (
    token !== `${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}`
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

router.post("/", requireAdmin, createPost);
router.put("/:id", requireAdmin, updatePost);
router.delete("/:id", requireAdmin, deletePost);

export default router;

