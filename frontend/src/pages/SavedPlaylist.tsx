import React, { useCallback, useEffect, useMemo, useState } from "react";
import PlaylistCard from "@/components/PlaylistCard/PlaylistCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { BackendPlaylist } from "@/features/playlist/playlist.types";
import { subscribeToRefetchEvents } from "@/lib/refetchEvents";

const filters = ["Recently Added", "Alphabetical"];

const SavedPage: React.FC = () => {
  const navigate = useNavigate();

  const userId = useAppSelector((state) => state.auth.user.id);

  const [savedPlaylists, setSavedPlaylists] = useState<BackendPlaylist[]>([]);
  const [activeFilter, setActiveFilter] = useState("Recently Added");

  const fetchSavedPlaylists = useCallback(async () => {
    if (!userId) {
      setSavedPlaylists([]);
      return;
    }

    try {
      const response = await api.get(`/users/${userId}/saved`);
      setSavedPlaylists(response.data.savedPlaylists as BackendPlaylist[]);
    } catch (error) {
      console.error("Error fetching saved playlists:", error);
    }
  }, [userId]);

  useEffect(() => {
    void fetchSavedPlaylists();
  }, [fetchSavedPlaylists]);

  useEffect(() => {
    return subscribeToRefetchEvents((detail) => {
      if (detail.type === "savedPlaylists") {
        void fetchSavedPlaylists();
      }
    });
  }, [fetchSavedPlaylists]);

  const sortedPlaylists = useMemo(() => {
    if (activeFilter === "Alphabetical") {
      return [...savedPlaylists].sort((a, b) => a.name.localeCompare(b.name));
    }

    return savedPlaylists;
  }, [savedPlaylists, activeFilter]);

  const handleSavedChange = (playlistId: string, saved: boolean) => {
    void playlistId;
    void saved;
    void fetchSavedPlaylists();
  };

  return (
    <div className="px-10 py-10 flex flex-col gap-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primaryText">
            Saved Playlists
          </h1>

          <p className="text-secondaryText mt-2">
            Discover and listen to your curated collection.
          </p>
        </div>

        <div className="flex gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-5 py-2 rounded-xl text-sm font-medium
                transition-all duration-300
                ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-accentText to-purple-600 text-white shadow-md"
                    : "bg-neutral-100 text-secondaryText hover:bg-neutral-200"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        {sortedPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlist={{
              id: playlist._id,
              title: playlist.name,
              subtitle: playlist.description || "Saved Playlist",
              image: playlist.coverImage || "/Hero.png",
              likes: playlist.likes,
              songs: playlist.songs?.length || 0,
              totalLikes: playlist.totalLikes || 0,
              featured: false,
            }}
            onSavedChange={handleSavedChange}
          />
        ))}
      </div>

      <div
        className="
        mt-10
        border-2 border-dashed border-accentText/30
        rounded-3xl
        py-14
        flex flex-col items-center gap-6
        bg-gradient-to-br
        from-white
        to-accentText/5
      "
      >
        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-accentText to-purple-600 flex items-center justify-center shadow-lg">
          <Plus className="text-white w-6 h-6" />
        </div>

        <h2 className="text-xl font-semibold text-primaryText">
          Want to discover more?
        </h2>

        <p className="text-secondaryText text-center max-w-md text-sm">
          Browse through thousands of community-curated playlists and add them
          to your library.
        </p>

        <button
          onClick={() => navigate("/explore")}
          className="
            px-8 py-3 rounded-full
            bg-gradient-to-r from-accentText to-purple-600
            text-white font-medium
            shadow-lg
            hover:scale-105 transition-transform
          "
        >
          Explore New Playlists
        </button>
      </div>
    </div>
  );
};

export default SavedPage;
