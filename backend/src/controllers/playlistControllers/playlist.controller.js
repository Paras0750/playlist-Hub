import { Playlist } from "../../models/playlist.model.js";
import ApiError from "../../utils/ApiError.js";

const extractSpotifyId = (urlOrId) => {
  if (urlOrId.includes("spotify.com")) {
    return urlOrId.split("/track/")[1]?.split("?")[0];
  }
  return urlOrId;
};

export const createPlaylist = async (req, res) => {
try {
    const {
      name,
      description,
      songs = [],
      isPublic = false,
      coverImage,
      totalLikes = 0,
      tags = [],
      likes = [],
    } = req.body;
  
    if (!name) {
      throw new ApiError(400, "Playlist name is required");
    }
  
    const cleanedSongs = songs.map((song) => ({
      spotifyId: extractSpotifyId(song),
    }));
  
    const playlist = await Playlist.create({
      name,
      description,
      owner: req.user._id,
      songs: cleanedSongs,
      isPublic,
      coverImage,
      totalLikes,
      tags,
      likes,
    });
  
    res.status(201).json(playlist);
} catch (error) {
  console.log("error : ",error)
  res.status(400).json({ error: error.message });
}
};


export const getAllPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ isPublic: true }).populate(
    "owner",
    "username email",
  );

  res.json(playlists);
};

// FETCH PUBLIC PLAYLISTS
export const getPublicPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ isPublic: true }).populate(
    "owner",
    "username",
  );

  res.json(playlists);
};



export const getMyPlaylists = async (req, res) => {
  const playlists = await Playlist.find({
    owner: req.user._id,
  });

  res.json(playlists);
};





export const getSavedPlaylists = async (req, res) => {
  const playlists = await Playlist.find({
    likes: req.user._id,
  });

  res.json(playlists);
};


export const toggleSavePlaylist = async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  const userId = req.user._id.toString();

  const alreadySaved = playlist.likes.some((id) => id.toString() === userId);

  if (alreadySaved) {
    playlist.likes = playlist.likes.filter((id) => id.toString() !== userId);
  } else {
    playlist.likes.push(req.user._id);
  }

  playlist.totalLikes = playlist.likes.length;

  await playlist.save();

  res.json(playlist);
};

// DELETE PLAYLIST
export const deletePlaylist = async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  await playlist.deleteOne();

  res.json({
    message: "Playlist deleted successfully",
  });
};
