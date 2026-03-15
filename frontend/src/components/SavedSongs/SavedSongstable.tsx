 import React from "react";
import type { BackendSong } from "@/features/songs/song.types";
import {
  formatSongAddedAt,
  formatSongDuration,
  getSongArtistLabel,
} from "@/lib/songUtils";

interface SavedSongsTableProps {
  songs: BackendSong[];
}

const SavedSongsTable: React.FC<SavedSongsTableProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-10 text-center text-secondaryText shadow-sm">
        No saved songs match this view yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <div className="grid grid-cols-6 text-xs text-secondaryText px-6 py-4 border-b">
        <span>#</span>
        <span className="col-span-2">TITLE</span>
        <span>ALBUM</span>
        <span>DATE ADDED</span>
        <span className="text-right">⏱</span>
      </div>

      {songs.map((song, index) => (
        <div
          key={song.spotifyId}
          className="grid grid-cols-6 px-6 py-4 text-sm items-center hover:bg-neutral-50 transition"
        >
          <span>{index + 1}</span>

          <div className="col-span-2 flex items-center gap-3">
            <div className="h-11 w-11 overflow-hidden rounded-lg bg-neutral-100">
              {song.coverImageUrl ? (
                <img
                  src={song.coverImageUrl}
                  alt={song.name}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            <div>
            <p className="font-medium text-primaryText">{song.name}</p>
            <p className="text-xs text-secondaryText">
              {getSongArtistLabel(song.artists)}
            </p>
            </div>
          </div>

          <span className="text-secondaryText">
            {song.album || "Single"}
          </span>

          <span className="text-secondaryText">
            {formatSongAddedAt(song.addedAt)}
          </span>

          <span className="text-right text-secondaryText">
            {formatSongDuration(song.durationMs)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SavedSongsTable;
