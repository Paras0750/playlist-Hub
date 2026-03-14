import React from "react";
import { Heart, ChevronDown, X } from "lucide-react";

const recentlyAdded = [
    { id: 1, title: "Morning Mist", artist: "Ambient Flow" },
    { id: 2, title: "Bloom", artist: "Serenity Project" },
];

const PlaylistSelector: React.FC = () => {
    return (
        <div className="w-72 shrink-0">
            {/* Adding To */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
                <p className="text-[11px] tracking-widest text-secondaryText font-medium mb-3">
                    ADDING TO
                </p>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 hover:border-accentText/40 transition">
                    <div className="flex items-center gap-3">
                        <Heart size={18} className="text-accentText fill-accentText" />
                        <span className="font-medium text-primaryText text-sm">
                            Saved Songs
                        </span>
                    </div>
                    <ChevronDown size={16} className="text-secondaryText" />
                </button>
            </div>

            {/* Recently Added */}
            <div className="bg-white rounded-2xl shadow-sm p-5 mt-4">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[11px] tracking-widest text-secondaryText font-medium">
                        RECENTLY ADDED
                    </p>
                    <span className="text-xs font-semibold text-accentText">
                        {recentlyAdded.length} New
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {recentlyAdded.map((song) => (
                        <div
                            key={song.id}
                            className="flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                                    <span className="text-secondaryText text-sm">♪</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-primaryText">
                                        {song.title}
                                    </p>
                                    <p className="text-xs text-secondaryText">{song.artist}</p>
                                </div>
                            </div>
                            <button className="text-secondaryText hover:text-red-400 transition opacity-60 group-hover:opacity-100">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-5 py-2.5 rounded-full border border-neutral-200 text-sm font-medium text-secondaryText hover:border-accentText hover:text-accentText transition">
                    Review Playlist
                </button>
            </div>
        </div>
    );
};

export default PlaylistSelector;
