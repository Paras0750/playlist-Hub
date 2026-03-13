import React, { useEffect, useState } from "react";
import PlaylistCard from "@/components/PlaylistCard/PlaylistCard";
import api from "@/services/api";
import type { BackendPlaylist } from "@/features/playlist/playlist.types";

const ExplorePage: React.FC = () => {
  const [playlists, setPlaylists] = useState<BackendPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicPlaylists = async () => {
      try {
        const response = await api.get("/playlists/fetchPublic");
        setPlaylists(response.data as BackendPlaylist[]);
      } catch (err) {
        console.error("Error fetching public playlists:", err);
        setError("Failed to load public playlists.");
      } finally {
        setLoading(false);
      }
    };

    void fetchPublicPlaylists();
  }, []);

  return (
    <section className="px-8 py-10 flex flex-col gap-10">
      {loading && (
        <div className="rounded-3xl bg-white px-6 py-8 text-secondaryText shadow-sm">
          Loading playlists...
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && playlists.length === 0 && (
        <div className="rounded-3xl bg-white px-6 py-8 text-secondaryText shadow-sm">
          No public playlists available yet.
        </div>
      )}

      {!loading && !error && playlists.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
        >
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={{
                id: playlist._id,
                title: playlist.name,
                subtitle: `By ${playlist.owner?.username ?? "Unknown creator"}`,
                image: playlist.coverImage || "/Hero.png",
                likes: playlist.likes,
                songs: playlist.songs?.length || 0,
                totalLikes: playlist.totalLikes || 0,
                featured: false,
              }}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default ExplorePage;
