import React from "react";
import PlaylistCard from "@/components/PlaylistCard/PlaylistCard";

const ExplorePage: React.FC = () => {
  const playlists = [
    {
      id: 1,
      title: "Late Night Lo-Fi",
      subtitle: "By AlexAudio",
      image: "/Hero.png",
      likes: "2.4k",
      songs: 48,
    },
    {
      id: 2,
      title: "Deep Focus Techno",
      subtitle: "By DJ Nova",
      image: "/Hero.png",
      likes: "1.8k",
      songs: 36,
    },
    {
      id: 3,
      title: "Indie Discoveries",
      subtitle: "By SoundWave",
      image: "/Hero.png",
      likes: "3.1k",
      songs: 52,
    },
    {
      id: 4,
      title: "Chill Study Mix",
      subtitle: "By LofiDreamer",
      image: "/Hero.png",
      likes: "5.6k",
      songs: 64,
    },
  ];

  return (
    <section className="px-8 py-10 flex flex-col gap-10">

      
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
            key={playlist.id}
            playlist={playlist}
          />
        ))}
      </div>

    </section>
  );
};

export default ExplorePage;
