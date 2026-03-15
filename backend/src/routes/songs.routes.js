
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addSongToLibrary,
  addSongsToPlaylist,
  getAllSongs,
  getSongLibrary,
  removeSongFromLibrary,
} from "../controllers/songsControllers/songs.controller.js";

const router = express.Router();

router.get("/library", authMiddleware, getSongLibrary);
router.post("/library", authMiddleware, addSongToLibrary);
router.delete("/library", authMiddleware, removeSongFromLibrary);
router.get('/', getAllSongs);
router.post('/add/:id', authMiddleware, addSongsToPlaylist);
export default router;
