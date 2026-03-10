import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Playlist } from "./playlist.types";
import api from "@/services/api";


export const fetchAllPlaylists = createAsyncThunk<Playlist[], void>(
  "",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/playlists");
      return res.data as Playlist[];
    } catch (error : any) {

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch playlists",
      );

    }
  },
);

export const fetchSavedPlaylists = createAsyncThunk<Playlist[], void>(
  "playlist/fetchSaved",
  async (_,{rejectWithValue}) => {
    try {
      const res = await api.get("/playlists/saved");
      return res.data as Playlist[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch saved playlists",
      );
    }
  },
);

export const fetchMyPlaylists = createAsyncThunk<Playlist[], void>(
  "playlist/myPlaylist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/playlists/me");

      return res.data as Playlist[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my playlists",
      );
    }
  },
);

export const fetchPublicPlaylists = createAsyncThunk<Playlist[], void>(
  "playlist/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {

      const res = await api.get("/playlists/public");
      return res.data as Playlist[];

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch public playlists",
      );
    }
  },
);

export const toggleSavePlaylist = createAsyncThunk<Playlist, string>(
  "playlist/toggleSave",
  async (playlistId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/playlists/${playlistId}/save`);

      return res.data as Playlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle playlist save",
      );
    }
  },
);
export const toggleLike = createAsyncThunk<Playlist,void>
("/playlist/togglelike",async (_,{rejectWithValue}) =>{
     api.post(`/playlists/${userId}/toggleLike`)
})

export const createPlaylist = createAsyncThunk<Playlist, Partial<Playlist>>(
  "playlist/create",
  async (playlistData, { rejectWithValue }) => {
    try {
      const res = await api.post("/playlists/create", playlistData);

      return res.data as Playlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create playlist",
      );
    }
  },
);

export const deletePlaylist = createAsyncThunk<string, string>(
  "playlist/delete",
  async (playlistId, { rejectWithValue }) => {
    try {
      await api.delete(`/playlists/${playlistId}`);

      return playlistId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete playlist",
      );
    }
  },
);
