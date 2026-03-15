import React, { useState } from "react";
import { Play, Heart, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { toggleSavePlaylist } from "@/features/playlist/playlistThunks";

interface Playlist {
  id: string | number;
  title: string;
  subtitle?: string;
  image?: string;
  likes?: string[] | string;
  songs?: number;
  featured?: boolean;
  totalLikes ?: number;
}

interface PlaylistCardProps {
  playlist: Playlist;
  className?: string;
  onSavedChange?: (playlistId: string, saved: boolean) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  className = "",
  onSavedChange,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.user.id);
  const savedPlaylists = useAppSelector(
    (state) => state.auth.user.savedPlaylists,
  );
  const [isSaving, setIsSaving] = useState(false);
  const {
    id,
    title,
    subtitle,
    image,
    likes,
    songs,
    featured ,
    totalLikes
  } = playlist;
  const playlistId = typeof id === "string" ? id : null;
  const isSaved = playlistId ? savedPlaylists.includes(playlistId) : false;
  const likeCount = typeof totalLikes === "number"
    ? totalLikes
    : Array.isArray(likes)
      ? likes.length
      : likes;

  const handlePlay = () => {
    navigate(`/playlist/${id}`);
  };

  const handleSave = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    if (!playlistId || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      const result = await dispatch(toggleSavePlaylist(playlistId)).unwrap();
      onSavedChange?.(result.playlistId, result.saved);
    } catch (error) {
      console.error("Error toggling saved playlist:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`
        w-full rounded-2xl bg-gradient-to-br
        from-[#fbf7fc] to-white shadow-md p-3 sm:p-4 relative
        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col
        ${className}
      `}
    >
      {/* Cover Image */}
      <div
        className="relative aspect-square w-full rounded-xl bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${image || "/Hero.png"})` }}
      >
        {featured && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-white/40 backdrop-blur-md text-white tracking-widest font-medium">
            FEATURED
          </span>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !playlistId}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/80 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow hover:scale-110 transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Heart
            size={16}
            className={isSaved ? "text-red-500 fill-red-500" : "text-gray-500"}
          />
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-3 sm:mt-4 flex-1">
        <h3 className="text-base sm:text-lg font-bold text-[#2e2844] line-clamp-1">
          {title}
        </h3>
        <p className="text-neutral-500 text-xs sm:text-sm mt-0.5 sm:mt-1 line-clamp-1">
          {subtitle || ""}
        </p>
      </div>

      <div className="border-t border-neutral-200 my-2.5 sm:my-3"></div>

      {/* Footer / Stats */}
      <div className="flex items-center justify-between text-neutral-500 text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {likes !== undefined && (
            <div className="flex items-center gap-1">
              <Heart size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span>{likeCount}</span>
            </div>
          )}
          {songs !== undefined && (
            <div className="flex items-center gap-1">
              <Clock size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span>{songs} Songs</span>
            </div>
          )}
        </div>

        <button
          onClick={handlePlay}
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primaryText flex items-center justify-center shadow-md hover:scale-105 transition-transform shrink-0 ml-2"
        >
          <Play size={14} className="sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
