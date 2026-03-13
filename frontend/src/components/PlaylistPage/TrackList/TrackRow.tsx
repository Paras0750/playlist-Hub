import React from "react";

interface TrackProps {
  track: {
    title: string;
    artist: string;
    album: string;
    duration: string | number;
  };
}

const TrackRow: React.FC<TrackProps> = ({ track }) => {
  const duration = typeof track.duration === "number"
    ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}`
    : track.duration;

  return (
    <div className="flex justify-between px-6 py-4 border-b last:border-none hover:bg-neutral-50">
      <div>
        <p className="font-medium">{track.title}</p>
        <p className="text-xs text-neutral-500">{track.artist}</p>
      </div>

      <span className="text-neutral-500">{duration}</span>
    </div>
  );
};

export default TrackRow;
