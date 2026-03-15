import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Maximize2,
 
  Heart
} from "lucide-react";

const Miniplayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(35); // Mock progress percentage
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Mock song data
  const song = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    coverUrl:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop",
    currentTime: "1:15",
    totalTime: "3:20",
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 sm:px-6 sm:pb-6 pointer-events-none"
    >
      <div 
        className="pointer-events-auto w-full max-w-[1200px] bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-3 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(148,123,237,0.15)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <div className="flex items-center gap-3 w-[30%] min-w-[200px]">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-neutral-100 shadow-sm group cursor-pointer">
            <img
              src={song.coverUrl}
              alt={song.title}
              className={`h-full w-full object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 size={16} className="text-white drop-shadow-md" />
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <h4 className="truncate text-sm font-semibold text-primaryText hover:underline cursor-pointer">
              {song.title}
            </h4>
            <p className="truncate text-[11px] text-secondaryText hover:underline cursor-pointer">
              {song.artist}
            </p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="ml-2 text-secondaryText hover:text-accentText transition-colors"
          >
            <Heart size={16} className={isLiked ? "fill-accentText text-accentText" : ""} />
          </button>
        </div>


        <div className="flex flex-col items-center justify-center gap-1.5 w-[40%] max-w-[500px]">
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-secondaryText transition hover:text-accentText">
              <Shuffle size={16} />
            </button>
            <button className="text-primaryText transition hover:text-accentText hover:-translate-x-0.5 transform">
              <SkipBack size={20} className="fill-current" />
            </button>
            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accentText text-white shadow-md shadow-accentText/30 transition-all hover:scale-105 hover:bg-accentText/90 active:scale-95"
            >
              {isPlaying ? (
                <Pause size={18} className="fill-current" />
              ) : (
                <Play size={18} className="fill-current ml-0.5" />
              )}
            </button>
            <button className="text-primaryText transition hover:text-accentText hover:translate-x-0.5 transform">
              <SkipForward size={20} className="fill-current" />
            </button>
            <button className="text-secondaryText transition hover:text-accentText">
              <Repeat size={16} />
            </button>
          </div>
          
          <div className="flex w-full items-center gap-2 text-[10px] font-medium text-secondaryText">
            <span className="w-8 text-right">{song.currentTime}</span>
            <div className="group relative flex h-2.5 flex-1 cursor-pointer items-center">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200/80 transition-all group-hover:h-2">
                <div
                  className="h-full rounded-full bg-accentText transition-all relative"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div 
                className={`absolute h-3 w-3 rounded-full bg-white border-2 border-accentText shadow-sm transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ left: `calc(${progress}% - 6px)` }}
              ></div>
            </div>
            <span className="w-8">{song.totalTime}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-3 w-[30%] min-w-[200px]">

          <div className="flex items-center gap-2 w-24">
            <button className="text-secondaryText transition hover:text-accentText">
              <Volume2 size={16} />
            </button>
            <div className="group flex h-2.5 flex-1 cursor-pointer items-center">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200/80 group-hover:h-2 transition-all">
                <div className="h-full w-2/3 rounded-full bg-accentText/80 transition-all group-hover:bg-accentText"></div>
              </div>
            </div>
          </div>
          <button className="text-secondaryText transition hover:text-accentText ml-2">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Miniplayer;
