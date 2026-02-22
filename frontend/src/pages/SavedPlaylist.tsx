import React, { useState } from "react";
import PlaylistCard from "@/components/PlaylistCard/PlaylistCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dummyPlaylists = [
  {
    id: 1,
    title: "Midnight Resonance",
    subtitle: "by Digital Nomad",
    image: "/Hero.png",
  },
  {
    id: 2,
    title: "Chill Lo-Fi Beats",
    subtitle: "by Lofi Girl",
    image: "/Hero.png",
  },
  {
    id: 3,
    title: "Summer Anthems",
    subtitle: "by PlaylistHub",
    image: "/Hero.png",
  },
  {
    id: 4,
    title: "Deep Focus Techno",
    subtitle: "by TechNode",
    image: "/Hero.png",
  },
  {
    id: 5,
    title: "Indigo Soul",
    subtitle: "by Soulman",
    image: "/Hero.png",
  },
];

const filters = ["Recently Added", "Alphabetical", "Albums"];

const SavedPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Recently Added");
  const navigate = useNavigate();

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

        {dummyPlaylists.map((playlist) => (
  <PlaylistCard key={playlist.id} playlist={playlist} />
))}

</div>

      <div className="
        mt-10
        border-2 border-dashed border-accentText/30
        rounded-3xl
        py-14
        flex flex-col items-center gap-6
        bg-gradient-to-br
        from-white
        to-accentText/5
      ">

        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-accentText to-purple-600 flex items-center justify-center shadow-lg">
          <Plus className="text-white w-6 h-6" />
        </div>

        <h2 className="text-xl font-semibold text-primaryText">
          Want to discover more?
        </h2>

        <p className="text-secondaryText text-center max-w-md text-sm">
          Browse through thousands of community-curated playlists
          and add them to your library.
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
