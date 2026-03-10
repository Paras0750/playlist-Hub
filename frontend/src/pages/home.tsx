import React, { useRef, useEffect, useState } from "react";
import Filterdiv from "@/components/Filters/Filterdiv";
import Hero from "@/components/Hero/Hero";
import PlaylistCard from "@/components/PlaylistCard/PlaylistCard";
import api from "@/services/api";

const Home: React.FC = () => {

  const filterRef = useRef<HTMLDivElement | null>(null);

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const scrollToFilters = () => {
    filterRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const fetchPlaylists = async () => {
    try {
      const response = await api.get("/playlists");

      setPlaylists(response.data.data || response.data);

    } catch (err) {
      console.error("Error fetching playlists:", err);
      setError("Failed to load playlists");
    }
  };

  
    useEffect(() => {
      fetchPlaylists();
    },[]);
    console.log(playlists)

  return (
    <section className="flex flex-col gap-6 pb-10">

      <Hero onExploreClick={scrollToFilters} />

      <Filterdiv ref={filterRef} />

      <div className="px-6">

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{/* placeholder */}
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={{
                id: playlist.id,
                title: playlist.name,
                subtitle: playlist.description || "",
                image: playlist.image,
                likes: '1.2k',
                songs: 1,
                featured: false
              }}
            />
          ))}

        </div>
      </div>

    </section>
  );
};

export default Home;