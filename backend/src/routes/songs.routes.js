
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAllSongs } from "../controllers/songsControllers/songs.controller.js";

const router = express.Router();

router.get('/', getAllSongs);

export default router;