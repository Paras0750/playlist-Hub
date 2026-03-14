import React from "react";
import { Plus } from "lucide-react";

interface SearchResultRowProps {
    song: {
        id: number;
        title: string;
        artist: string;
        album: string;
        duration: string;
        cover: string;
}
}

const SearchResultRow: React.FC<SearchResultRowProps> = ({ song }) => {
    return (
        <div className="flex items-center justify-between py-4 px-2 hover:bg-white/40 rounded-xl transition group">
            <div className="flex items-center gap-4">
                <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm"
                    style={{ backgroundImage: `url(${song.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <span className="text-white/80 text-lg">♪</span>
                </div>

                <div>
                    <p className="font-semibold text-primaryText text-sm">{song.title}</p>
                    <p className="text-xs text-secondaryText">
                        {song.artist} • {song.album}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-secondaryText">{song.duration}</span>
                <button className="px-4 py-1.5 rounded-full bg-accentText text-white text-sm font-medium flex items-center gap-1 hover:bg-purple-600 transition shadow-sm hover:shadow-md">
                    <Plus size={14} />
                    Add
                </button>
            </div>
        </div>
    );
};

export default SearchResultRow;
