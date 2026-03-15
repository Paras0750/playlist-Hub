import type React from "react";
import { Search } from "lucide-react";
import SubtleBouncingBalls from "./stubleBouncingBalls";

//Selection add krna h
const SearchBar: React.FC = () => {
  return (
    <div className="font-heading relative flex h-10 sm:h-11 w-full max-w-[600px] items-center justify-center font-extralight transition-transform duration-300 hover:scale-[1.01]">
      <input type="text" name="search" id="search" placeholder="Search for artist, song..." 
      className="flex h-full w-full rounded-4xl border border-neutral-200 py-2 pl-10 sm:pl-12 pr-4
      tracking-wide sm:tracking-widest caret-neutral-400  
      backdrop-blur-md placeholder:text-xs sm:placeholder:text-sm placeholder:text-neutral-400 
      focus:ring-[0.5px] focus:outline-none focus:ring-accentText text-primaryText
      bg-linear-to-r from-[#fdf6ff] from-0% to-[#f4ffff] text-sm" />
      <Search className="top-2.1 absolute left-3 h-4 w-6 invert-60 " />
      <SubtleBouncingBalls />
    </div>
  );
};
export default SearchBar;
