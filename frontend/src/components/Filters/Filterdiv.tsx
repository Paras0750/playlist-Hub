import { useState, useMemo, forwardRef } from "react";
import Filterbtn from "./Filterbtn";

const genres = [
  "Pop",
  "Hip Hop",
  "Rock",
  "Jazz",
  "EDM",
  "Classical",
  "Indie",
  "Lo-fi",
  "R&B",
  "Punjabi",
];

const Filterdiv = forwardRef<HTMLDivElement>((_, ref) => {
  const [showAll, setShowAll] = useState(false);

  const visibleGenres = useMemo(
    () => (showAll ? genres : genres.slice(0, 5)),
    [showAll]
  );

  return (
    <section ref={ref} className="mx-2 sm:mx-5 mt-8 sm:mt-12 mb-6 sm:mb-8 w-[calc(100%-16px)] sm:w-[96%] max-w-7xl">

      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-primaryText">
          Top Genres
        </h2>

        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="
            rounded-full bg-accentText/10
            px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs
            font-subHeadingText text-accentText
            transition-all duration-200
            hover:bg-accentText/30
            active:scale-95 shrink-0 ml-2
          "
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>

      <div className="mt-4 sm:mt-6 flex sm:flex-wrap gap-2 sm:gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 scrollbar-hide">
        {visibleGenres.map((genre) => (
          <Filterbtn key={genre} label={genre} />
        ))}
      </div>

    </section>
  );
});

export default Filterdiv;
