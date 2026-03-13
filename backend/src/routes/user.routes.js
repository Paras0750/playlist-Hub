import express from "express";
import  authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.middleware.js";
import { getMyPlaylists, getSavedPlaylists } from "../controllers/playlistControllers/playlist.controller.js";
import {
  getCurrentUserProfile,
  getUserProfileById,
  toggleFollowUser,
  updateProfileImage,
} from "../controllers/userControllers/profile.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getCurrentUserProfile);
router.patch("/profile/image", authMiddleware, upload.single("image"), updateProfileImage);
router.get("/:id/profile", getUserProfileById);
router.post("/:id/follow", authMiddleware, toggleFollowUser);
router.get("/:id/myPlaylists", authMiddleware, getMyPlaylists)
router.get("/:id/saved", authMiddleware, getSavedPlaylists);
// router.get("/:id/playlists", authMiddleware, getUserPlaylists);

export default router;
