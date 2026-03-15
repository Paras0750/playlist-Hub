import { PlayCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";



interface HeroProps {
  onExploreClick: () => void;
}
const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const navigate = useNavigate();


  const handleStartListening = () => {
    navigate("/explore");
  };



  return (
    <div className="mx-2 sm:mx-5 w-[calc(100%-16px)] sm:w-[96%] overflow-hidden rounded-3xl sm:rounded-4xl bg-transparent shadow-xl">
      <div className="relative flex h-[40vh] sm:h-[50vh] flex-col justify-center rounded-3xl sm:rounded-4xl bg-[url('/Hero.png')] bg-cover bg-center">

        <div className="absolute inset-0 rounded-3xl sm:rounded-4xl bg-gradient-to-r from-black/10 via-black/40 to-transparent"></div>

        <button
          onClick={() => navigate("/explore?filter=trending")}
          className="text-accentText font-subHeadingText absolute top-4 left-4 sm:top-6 sm:left-6 z-10 rounded-full bg-white/90 px-3 py-1 sm:px-4 text-xs sm:text-sm font-medium tracking-wider backdrop-blur-md"
        >
          Trending Now
        </button>

        <div className="absolute z-10 flex flex-col justify-center gap-4 sm:gap-6 px-4 sm:px-10 selection:text-white/45 w-full">

          <div>
            <h1 className="flex flex-col text-3xl sm:text-5xl font-bold">
              <span className="text-[#2e2844]">Find your</span>

              <span className="font-headingText bg-gradient-to-r from-accentText to-[#fbad6cd8] bg-clip-text text-transparent leading-tight sm:leading-normal">
                sonic sanctuary
              </span>
            </h1>

            <p className="mt-2 sm:mt-4 max-w-xl text-xs sm:text-sm font-light text-[#2e2844] max-w-[80%] sm:max-w-none">
              Discover curated playlists across your favorite platforms.
              <br className="hidden sm:block" />
              Shared by a community of music lovers.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2 sm:mt-0">
            <button
              onClick={handleStartListening}
              className="
                flex cursor-pointer items-center justify-center gap-2
                rounded-full bg-[#2e2844]
                px-5 py-2.5 sm:px-6 sm:py-3 font-light text-white text-sm sm:text-base
                shadow-md transition-transform duration-200
                hover:scale-105 w-full sm:w-auto
              "
            >
              <PlayCircleIcon className="h-4 w-4" />
              Start Listening
            </button>

            <button
              onClick={onExploreClick}
              className="
                text-primaryText cursor-pointer text-center
                rounded-full bg-white/90
                px-5 py-2.5 sm:px-6 sm:py-3 font-light text-sm sm:text-base
                shadow-md backdrop-blur-md
                transition-transform duration-200
                hover:scale-105 w-full sm:w-auto
              "
            >
              Explore Genres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
