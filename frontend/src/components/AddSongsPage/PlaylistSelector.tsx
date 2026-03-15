import React from "react";
import { ArrowUpRight, Heart, Music4, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type {
  AddSongsTarget,
  BackendSong,
  SongLibraryPlaylist,
} from "@/features/songs/song.types";
import { formatSongAddedAt, getSongArtistLabel } from "@/lib/songUtils";

interface PlaylistSelectorProps {
  playlists: SongLibraryPlaylist[];
  savedSongs: BackendSong[];
  selectedTarget: AddSongsTarget;
  onSelectTarget: (target: AddSongsTarget) => void;
  recentlyAdded: BackendSong[];
  onRemoveSong: (spotifyId: string) => void;
  isRemovingSongId: string | null;
}

const PlaylistSelector: React.FC<PlaylistSelectorProps> = ({
  playlists,
  savedSongs,
  selectedTarget,
  onSelectTarget,
  recentlyAdded,
  onRemoveSong,
  isRemovingSongId,
}) => {
  const navigate = useNavigate();

  const selectedPlaylist =
    selectedTarget.type === "playlist"
      ? playlists.find((playlist) => playlist._id === selectedTarget.playlistId)
      : null;

  const reviewPath =
    selectedTarget.type === "saved" || !selectedPlaylist
      ? "/saved-songs"
      : `/playlist/${selectedPlaylist._id}`;

  const collectionLabel =
    selectedTarget.type === "saved" || !selectedPlaylist
      ? "Saved Songs"
      : selectedPlaylist.name;

  return (
    <div className="w-full shrink-0 xl:w-80">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="mb-3 text-[11px] font-medium tracking-widest text-secondaryText">
          ADDING TO
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onSelectTarget({ type: "saved" })}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
              selectedTarget.type === "saved"
                ? "border-accentText/60 bg-accentText/5"
                : "border-neutral-200 hover:border-accentText/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart size={18} className="fill-accentText text-accentText" />
              <div>
                <span className="block text-sm font-medium text-primaryText">
                  Saved Songs
                </span>
                <span className="text-xs text-secondaryText">
                  {savedSongs.length} songs
                </span>
              </div>
            </div>
          </button>

          {playlists.map((playlist) => {
            const isSelected =
              selectedTarget.type === "playlist" &&
              selectedTarget.playlistId === playlist._id;

            return (
              <button
                key={playlist._id}
                type="button"
                onClick={() =>
                  onSelectTarget({ type: "playlist", playlistId: playlist._id })
                }
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  isSelected
                    ? "border-accentText/60 bg-accentText/5"
                    : "border-neutral-200 hover:border-accentText/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-neutral-100">
                    {playlist.coverImage ? (
                      <img
                        src={playlist.coverImage}
                        alt={playlist.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Music4 size={16} className="text-secondaryText" />
                    )}
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-primaryText">
                      {playlist.name}
                    </span>
                    <span className="text-xs text-secondaryText">
                      {playlist.songs.length} songs
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {playlists.length === 0 ? (
          <p className="mt-3 text-xs text-secondaryText">
            Create a playlist to start adding tracks beyond Saved Songs.
          </p>
        ) : null}
      </div>

      <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium tracking-widest text-secondaryText">
              RECENTLY ADDED
            </p>
            <p className="mt-1 text-sm font-semibold text-primaryText">
              {collectionLabel}
            </p>
          </div>
          <span className="text-xs font-semibold text-accentText">
            {recentlyAdded.length} Recent
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {recentlyAdded.length === 0 ? (
            <div className="rounded-xl bg-neutral-50 px-4 py-5 text-sm text-secondaryText">
              No songs added here yet.
            </div>
          ) : (
            recentlyAdded.map((song) => (
              <div
                key={song.spotifyId}
                className="group flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-neutral-100">
                    {song.coverImageUrl ? (
                      <img
                        src={song.coverImageUrl}
                        alt={song.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-secondaryText">♪</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primaryText">
                      {song.name}
                    </p>
                    <p className="text-xs text-secondaryText">
                      {getSongArtistLabel(song.artists)}
                    </p>
                    <p className="text-[11px] text-secondaryText">
                      {formatSongAddedAt(song.addedAt)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveSong(song.spotifyId)}
                  disabled={isRemovingSongId === song.spotifyId}
                  className="text-secondaryText opacity-60 transition hover:text-red-400 group-hover:opacity-100 disabled:cursor-not-allowed"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate(reviewPath)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 py-2.5 text-sm font-medium text-secondaryText transition hover:border-accentText hover:text-accentText"
        >
          Review Collection
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PlaylistSelector;
