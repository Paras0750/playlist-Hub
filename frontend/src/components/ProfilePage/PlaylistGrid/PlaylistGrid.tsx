import React from "react";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import type { BackendPlaylist } from "@/features/playlist/playlist.types";

interface PlaylistGridProps {
  playlists: BackendPlaylist[];
  emptyMessage: string;
  onSavedChange?: (playlistId: string, saved: boolean) => void;
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({
  playlists,
  emptyMessage,
  onSavedChange,
}) => {
  if (playlists.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-white/70 px-6 py-16 text-center text-secondaryText">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          playlist={{
            id: playlist._id,
            title: playlist.name,
            subtitle: playlist.description || "PlaylistHub mix",
            image: playlist.coverImage || "/Hero.png",
            likes: playlist.likes,
            songs: playlist.songs?.length || 0,
            totalLikes: playlist.totalLikes || 0,
            featured: false,
          }}
          onSavedChange={onSavedChange}
        />
      ))}
    </div>
  );
};

export default PlaylistGrid;
