import React from "react";
import { formatSongDuration } from "@/lib/songUtils";

interface TrackProps {
  track: {
    title: string;
    artist: string;
    album: string;
    durationMs: string | number;
  };
}

const TrackRow: React.FC<TrackProps> = ({ track }) => {
  const duration =
    typeof track.durationMs === "number"
      ? formatSongDuration(track.durationMs)
      : track.durationMs;

  return (
    <div className="flex justify-between px-6 py-4 border-b last:border-none hover:bg-neutral-50">
      <div>
        <p className="font-medium">{track.title}</p>
        <p className="text-xs text-neutral-500">
          {track.artist}
          {track.album ? ` • ${track.album}` : ""}
        </p>
      </div>

      <span className="text-neutral-500">{duration}</span>
    </div>
  );
};

export default TrackRow;
