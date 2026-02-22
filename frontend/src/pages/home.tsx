import React, { useRef } from "react";
import Filterdiv from "@/components/Filters/Filterdiv";
import Hero from "@/components/Hero/Hero";
import PlaylistCard from "@/components/PlaylistCard/PlaylistCard";

const Home: React.FC = () => {
  const filterRef = useRef<HTMLDivElement | null>(null);

  const scrollToFilters = () => {
    filterRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const playlists = [
    {
      id: 1,
      title: "Late Night Lo-Fi",
      subtitle: "By PlaylistHub Curators",
      image: "/Hero.png",
      likes: "2.4k",
      songs: 48,
      featured: true,
    },
    {
      id: 2,
      title: "Chill Indie Mix",
      subtitle: "By Emily",
      image: "/Hero.png",
      likes: "1.8k",
      songs: 36,
    },
    {
      id: 3,
      title: "Synthwave Drive",
      subtitle: "By Retro Lovers",
      image: "/Hero.png",
      likes: "3.1k",
      songs: 52,
    },
  ];

  return (
    <section className="flex flex-col gap-6 pb-10">

      <Hero onExploreClick={scrollToFilters} />

      <Filterdiv ref={filterRef} />

      <div className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard key = {playlist.id}
              playlist={playlist}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Home;
