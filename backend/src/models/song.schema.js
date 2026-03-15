import mongoose from "mongoose";

export const songSchema = new mongoose.Schema(
  {
    spotifyId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    artists: {
      type: [String],
      required: true,
      default: [],
    },
    album: {
      type: String,
      default: "",
      trim: true,
    },
    durationMs: {
      type: Number,
      required: true,
    },
    coverImageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    spotifyUrl: {
      type: String,
      default: "",
      trim: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);
