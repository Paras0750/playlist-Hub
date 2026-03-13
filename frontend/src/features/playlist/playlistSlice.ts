import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Playlist } from "./playlist.types";

const initialState : Playlist = {
  title: "",
  description: "",
  image: "",
  imageFile: null,
  songs: [],
  tags : [],
  featured: false,
  visibility: "public"
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    updatePlaylist: (state, action: PayloadAction<Partial<Playlist>>) => {
      Object.assign(state, action.payload);
    }
  },
});

export const {  updatePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
