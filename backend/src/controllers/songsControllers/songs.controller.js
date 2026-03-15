import {apiSpotify} from "../../api/apiSpotify.js";
import { getSpotifyToken } from "../../services/spotify.service.js";
import { Playlist } from "../../models/playlist.model.js";
import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";

const serializeSong = (song) => ({
  spotifyId: song.spotifyId,
  name: song.name,
  artists: Array.isArray(song.artists) ? song.artists : [],
  album: song.album ?? "",
  durationMs: song.durationMs ?? 0,
  coverImageUrl: song.coverImageUrl ?? "",
  spotifyUrl: song.spotifyUrl ?? "",
  addedAt: song.addedAt ? new Date(song.addedAt).toISOString() : null,
});

const sortSongsByRecency = (songs = []) =>
  [...songs].sort((left, right) => {
    const leftTime = left.addedAt ? new Date(left.addedAt).getTime() : 0;
    const rightTime = right.addedAt ? new Date(right.addedAt).getTime() : 0;

    return rightTime - leftTime;
  });

const serializePlaylistTarget = (playlist) => ({
  _id: playlist._id,
  name: playlist.name,
  description: playlist.description ?? "",
  coverImage: playlist.coverImage ?? "",
  updatedAt: playlist.updatedAt,
  songs: sortSongsByRecency(playlist.songs ?? []).map(serializeSong),
});

const buildSongPayload = (song) => {
  if (!song || typeof song !== "object") {
    throw new ApiError(400, "Song payload is required");
  }

  const spotifyId = String(song.spotifyId ?? song.id ?? "").trim();
  const name = String(song.name ?? song.title ?? "").trim();
  const artists = Array.isArray(song.artists)
    ? song.artists.map((artist) => String(artist).trim()).filter(Boolean)
    : typeof song.artist === "string"
      ? song.artist.split(",").map((artist) => artist.trim()).filter(Boolean)
      : [];
  const album = String(song.album ?? "").trim();
  const durationMs = Number(song.durationMs ?? song.duration_ms ?? 0);
  const coverImageUrl = String(song.coverImageUrl ?? song.cover ?? "").trim();
  const spotifyUrl = String(song.spotifyUrl ?? song.spotify_url ?? "").trim();

  if (!spotifyId || !name || artists.length === 0 || !durationMs) {
    throw new ApiError(400, "Song payload is incomplete");
  }

  return {
    spotifyId,
    name,
    artists,
    album,
    durationMs,
    coverImageUrl,
    spotifyUrl,
    addedAt: new Date(),
  };
};

const getTargetDocument = async ({ userId, targetType, targetId }) => {
  if (targetType === "saved") {
    const user = await User.findById(userId).select("songs myPlaylist");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return {
      document: user,
      label: "Saved Songs",
    };
  }

  if (targetType === "playlist") {
    if (!targetId) {
      throw new ApiError(400, "Playlist id is required");
    }

    const playlist = await Playlist.findOne({
      _id: targetId,
      owner: userId,
    }).select("name songs owner");

    if (!playlist) {
      throw new ApiError(404, "Playlist not found");
    }

    return {
      document: playlist,
      label: playlist.name,
    };
  }

  throw new ApiError(400, "Invalid target type");
};

export const getAllSongs = async (req,res)=>{
    
  try {
    const token = await getSpotifyToken();

    const response = await apiSpotify.get('/search', {
      params: {
        q: req.query.search || 'punjabi',
        type: 'track',
        market: 'IN',
        limit: 10,
        offset: 0,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tracks = response.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((a) => a.name),
      album: track.album.name,
      cover: track.album.images[0]?.url,
      release_date: track.album.release_date,
      duration_ms: track.duration_ms,
      spotify_url: track.external_urls.spotify,
    }));

    res.json({ total: response.data.tracks.total, tracks });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Something went wrong';
    res.status(status).json({ error: message });
  }
}

export const getSongLibrary = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("songs myPlaylist")
      .populate({
        path: "myPlaylist",
        select: "name description coverImage songs updatedAt",
      });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.json({
      savedSongs: sortSongsByRecency(user.songs ?? []).map(serializeSong),
      playlists: (user.myPlaylist ?? []).map(serializePlaylistTarget),
    });
  } catch (error) {
    next(error);
  }
};

export const addSongToLibrary = async (req, res, next) => {
  try {
    const { targetType, targetId, song } = req.body ?? {};
    const nextSong = buildSongPayload(song);
    const { document, label } = await getTargetDocument({
      userId: req.user.id,
      targetType,
      targetId,
    });

    const alreadyExists = (document.songs ?? []).some(
      (entry) => entry.spotifyId === nextSong.spotifyId,
    );

    if (alreadyExists) {
      return res.status(200).json({
        added: false,
        message: `${nextSong.name} is already in ${label}.`,
      });
    }

    document.songs.unshift(nextSong);
    await document.save({ validateBeforeSave: false });

    res.status(201).json({
      added: true,
      targetType,
      targetId: targetType === "playlist" ? String(document._id) : null,
      song: serializeSong(nextSong),
      message: `${nextSong.name} added to ${label}.`,
    });
  } catch (error) {
    next(error);
  }
};

export const removeSongFromLibrary = async (req, res, next) => {
  try {
    const { targetType, targetId, spotifyId } = req.body ?? {};

    if (!spotifyId) {
      throw new ApiError(400, "Song id is required");
    }

    const { document, label } = await getTargetDocument({
      userId: req.user.id,
      targetType,
      targetId,
    });

    const existingSongs = document.songs ?? [];
    const nextSongs = existingSongs.filter((song) => song.spotifyId !== spotifyId);

    if (existingSongs.length === nextSongs.length) {
      return res.status(200).json({
        removed: false,
        message: "Song was not present in the selected target.",
      });
    }

    document.songs = nextSongs;
    await document.save({ validateBeforeSave: false });

    res.status(200).json({
      removed: true,
      targetType,
      targetId: targetType === "playlist" ? String(document._id) : null,
      spotifyId,
      message: `Song removed from ${label}.`,
    });
  } catch (error) {
    next(error);
  }
};

export const addSongsToPlaylist = async (req, res, next) => {
  req.body = {
    ...(req.body ?? {}),
    targetType: "playlist",
    targetId: req.params.id,
  };

  return addSongToLibrary(req, res, next);
};
