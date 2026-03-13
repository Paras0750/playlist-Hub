
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updatePlaylist } from "@/features/playlist/playlistSlice";

interface TagSectionProps {
  genres: string[];
}

const TagSection: React.FC<TagSectionProps> = ({ genres }) => {

  const dispatch = useAppDispatch();

  const selectedGenres = useAppSelector(
    (state) => state.playlist.tags ?? [],
  );
  
  const toggleGenre = (genre: string) => {
    
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    dispatch(
      updatePlaylist({
        tags: updatedGenres
      })
    );
  };

  return (
    <div className="mt-8 flex justify-between">

      <div>
        <h3 className="mb-3 text-xs text-primaryText">
          GENRES
        </h3>

        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => {

            const active = selectedGenres.includes(genre);

            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`
                  rounded-full px-4 py-2 text-sm
                  transition-all duration-200
                  hover:scale-105 cursor-pointer
                  ${
                    active
                      ? "bg-purple-600 text-white"
                      : "bg-purple-300/80 text-white"
                  }
                `}
              >
                {genre}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default TagSection;
