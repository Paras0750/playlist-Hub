import express from "express";

import authRoutes from "./auth.routes.js";
import playlistRoutes from "./playlist.routes.js";
import userRoutes from "./user.routes.js";


const router = express.Router();


router.use("/auth", authRoutes);
router.use("/playlists", playlistRoutes);
router.use("/users", userRoutes);


export default router;