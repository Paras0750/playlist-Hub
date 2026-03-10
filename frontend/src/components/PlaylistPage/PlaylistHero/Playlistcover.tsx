import React from "react";
import PlaylistActions from "./PlaylistActions";
import NotFound from "@/pages/NotFound";
import type { SpotifyPlaylist } from "../playlist.types";

const PlaylistHero: React.FC<{ playlist: SpotifyPlaylist | null }> = ({ playlist }) => {



  console.log("play",playlist)
  if(!playlist) return <NotFound></NotFound>;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm flex gap-8">


      <img className="w-56 h-56 rounded-2xl shadow-md" src={playlist.image}  />


      <div className="flex flex-col gap-4 flex-1">
        <span className="text-xs rounded-full w-fit text-green-600">
          SPOTIFY 
        </span>

        <h1 className="text-4xl font-bold font-headingText text-primaryText">
          {playlist.name}
        </h1>

        <p className="text-secondaryText font-light text-sm font-smtext tracking-wider">
          {playlist.description}
        </p>

        <PlaylistActions url = {playlist.url}/>

        <div className="flex gap-3 mt-4">
          {["#Lofi", "#Focus", "#Instrumental", "#Chill"].map(tag => (
            <span key={tag} className="px-3 py-1 bg-neutral-300/40 rounded-full text-primaryText font-light font-smtext text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHero;
