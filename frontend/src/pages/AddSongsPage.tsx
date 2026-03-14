import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchResultRow from "@/components/AddSongsPage/SearchResultRow";
import PlaylistSelector from "@/components/AddSongsPage/PlaylistSelector";
import api from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AddSongsPage: React.FC = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchTracks = async (query: string) => {
    try {
      setLoading(true);
      const response = await api.get("/songs", {
        params: { search: query || "punjabi" },
      });
      setSongs(response.data.tracks);
    } catch (error) {
      console.error("Failed to fetch tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks("");
  }, []);

  // debounce search input
  useEffect(() => {
    if (!search.trim()) {
      fetchTracks("");
      return;
    }
    const delay = setTimeout(() => {
      fetchTracks(search);
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f3f1ff] via-white to-[#eef2ff] px-10 py-8">
      <span>
        <h1 className="text-3xl font-bold text-primaryText mt-1 flex items-center gap-5" onClick={()=>{navigate(-1)}}>
      <ArrowLeft />
        Find Music to Add
      </h1>
      </span>
      <p className="text-secondaryText mt-1 text-sm">
        Build your perfect collection by searching millions of tracks.
      </p>

      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-accentText/30 rounded-2xl px-5 py-4 shadow-sm focus-within:border-accentText/60 transition">
            <Search size={18} className="text-secondaryText" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for tracks, artists, or albums..."
              className="bg-transparent outline-none w-full text-sm text-primaryText placeholder:text-secondaryText"
            />
          </div>

          <div className="mt-6 px-2">
            {loading ? (
              <p className="text-secondaryText text-sm text-center mt-10">
                Loading...
              </p>
            ) : songs.length === 0 ? (
              <p className="text-secondaryText text-sm text-center mt-10">
                No tracks found.
              </p>
            ) : (
              songs.map((song: any) => (
                <SearchResultRow
                  key={song.id}
                  song={{
                    id: song.id,
                    title: song.name,
                    artist: song.artists.join(", "),
                    album: song.album,
                    duration: msToMinutes(song.duration_ms),
                    cover: song.cover,
                  }}
                />
              ))
            )}
          </div>
        </div>
        <PlaylistSelector />
      </div>
    </div>
  );
};

const msToMinutes = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default AddSongsPage;
