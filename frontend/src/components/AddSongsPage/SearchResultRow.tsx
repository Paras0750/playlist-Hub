import React from "react";
import { Check, Plus } from "lucide-react";
import type { SearchTrack } from "@/features/songs/song.types";
import { formatSongDuration, getSongArtistLabel } from "@/lib/songUtils";

interface SearchResultRowProps {
  song: SearchTrack;
  onAdd: (song: SearchTrack) => void;
  isAdded: boolean;
  isAdding: boolean;
  destinationLabel: string;
}

const SearchResultRow: React.FC<SearchResultRowProps> = ({
  song,
  onAdd,
  isAdded,
  isAdding,
  destinationLabel,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl px-3 py-4 transition hover:bg-gray-100/60 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <img
          src={song.cover || "/Hero.png"}
          alt={song.name}
          className="h-14 w-14 rounded-xl object-cover shadow-sm transition-transform duration-150 group-hover:scale-110"
        />

        <div>
          <p className="font-semibold text-primaryText text-sm">{song.name}</p>
          <p className="text-xs text-secondaryText">
            {getSongArtistLabel(song.artists)} • {song.album}
          </p>
          {isAdded ? (
            <p className="mt-1 text-[11px] font-medium text-emerald-600">
              Already in {destinationLabel}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="text-sm text-secondaryText">
          {formatSongDuration(song.duration_ms)}
        </span>
        <button
          type="button"
          onClick={() => onAdd(song)}
          disabled={isAdded || isAdding}
          className="flex items-center gap-1 rounded-full bg-accentText px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-purple-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-emerald-500 disabled:hover:shadow-sm"
        >
          {isAdded ? <Check size={14} /> : <Plus size={14} />}
          {isAdded ? "Added" : isAdding ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default SearchResultRow;
