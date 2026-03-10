import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updatePlaylist } from "@/features/playlist/playlistSlice";
import { createPlaylist } from "@/features/playlist/playlistThunks";
import { useAppSelector } from "@/hooks/useAppSelector";

const PublishSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const playlist = useAppSelector((state) => state.playlist);

  const handleVisibility = (type: "public" | "private") => {
    dispatch(updatePlaylist({ visibility: type }));
  };

  const handlePublish = () => {
    console.log(playlist)
    // dispatch(createPlaylist(playlist));
  };

  return (
    <div className="flex justify-between items-center mt-10">

      <div className="flex gap-4">
        <button
          onClick={() => handleVisibility("public")}
          className={`
            px-5 py-2 rounded-full backdrop-blur-md cursor-pointer
            ${
              playlist.visibility === "public"
                ? "bg-purple-600 text-white"
                : "bg-white/50"
            }
          `}
        >
          Public
        </button>

        <button
          onClick={() => handleVisibility("private")}
          className={`
            px-5 py-2 rounded-full backdrop-blur-md cursor-pointer
            ${
              playlist.visibility === "private"
                ? "bg-purple-600 text-white"
                : "bg-white/50"
            }
          `}
        >
          Private
        </button>
      </div>

      <button
        onClick={handlePublish}
        className="
          px-8 py-3
          rounded-full
          bg-gradient-to-r
          from-purple-600
          to-purple-800
          text-white
          shadow-lg
          hover:scale-105
          transition cursor-pointer
        "
      >
        Publish Playlist
      </button>

    </div>
  );
};

export default PublishSection;
