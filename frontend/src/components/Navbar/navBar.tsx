import React from "react";
import SearchBar from "./searchBar";
import ShareBtn from "./shareBtn";
import Notification from "./notification";
import Profile from "./profile";
import { Menu } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

const NavBar: React.FC = () => {
  const { toggleMobileOpen } = useSidebar();

  return (
    <div className="flex items-center justify-between p-4 text-black mt-8">
      {/* Mobile hamburger — visible only on small screens */}
      <button
        onClick={toggleMobileOpen}
        className="md:hidden p-2 rounded-lg text-secondaryText hover:text-accentText 
          hover:bg-white/60 transition-all duration-200 mr-2"
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      <SearchBar />
      <div className="mx-2 flex items-center gap-[1vw]">
        <Notification />
        <ShareBtn />
        <Profile />
      </div>
    </div>
  );
};

export default NavBar;
