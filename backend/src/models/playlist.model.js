import mongoose from "mongoose";
import { songSchema } from "./song.schema.js";

const playlistSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String, 
      default: "",
    },
    tags : {
        type : [String],
        default : []
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    songs: {
      type: [songSchema],
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    totalLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }

)

export const Playlist = mongoose.model("Playlist",playlistSchema);
