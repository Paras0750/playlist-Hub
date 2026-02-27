import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});

router.get("/:id/playlists", authMiddleware, getUserPlaylists);

export default router;