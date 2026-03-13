import React from "react";
import type { BackendPlaylist } from "@/features/playlist/playlist.types";
import PlaylistActions from "./PlaylistActions";

const PlaylistHero: React.FC<{ playlist?: BackendPlaylist | null }> = ({
  playlist,
}) => {
  if (!playlist) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm flex gap-8">
      <img
        className="w-56 h-56 rounded-2xl shadow-md"
        src={playlist.coverImage || "https://via.placeholder.com/300?text=No+Cover"}
        alt={playlist.name}
      />

      <div className="flex flex-col gap-4 flex-1">
        <h1 className="text-4xl font-bold font-headingText text-primaryText">
          {playlist.name}
        </h1>

        <p className="text-secondaryText font-light text-sm font-smtext tracking-wider">
          {playlist.description}
        </p>

        <PlaylistActions prevLiked={false} />
      </div>
    </div>
  );
};

export default PlaylistHero;
