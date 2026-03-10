import express from "express";
import {
  createPlaylist,
  getAllPlaylists,
 
} from "../controllers/playlistControllers/playlist.controller.js";

import  verifyJWT  from "../middlewares/authMiddleware.js";
import { getPlaylist,getSinglePlaylist ,getPlaylistTracks} from "../controllers/playlistControllers/getPlaylist.controller.js";

const router = express.Router();
// router.get("/fetchPublic", getPlaylist);
// router.get("/:id", getSinglePlaylist);
// router.get('/:id/tracks',getPlaylistTracks);
// router.get("/me", verifyJWT, getMyPlaylists);
router.post("/", verifyJWT, createPlaylist);

// if i want to allow directly update playlist  then i can use patch method, but for now we will keep it simple and not allow update playlist
// router.patch("/:id", verifyJWT, updatePlaylist);
// router.delete("/:id", verifyJWT, deletePlaylist);
// router.post("/:id/like", verifyJWT, toggleLike);
// router.post("/:id/toggleSave", verifyJWT, toggleSave);








export default router;
