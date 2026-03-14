import SidebarHead from "./SidebarHead";
import SideSub from "./SideSub";
import SideFoot from "./SideFoot";
import { Plus, Menu, X } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useNavigate } from "react-router-dom";

const NewPlaylistBtn: React.FC = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`bg-primaryText font-subHeadingText flex cursor-pointer
        items-center justify-center gap-2 rounded-full p-2 text-sm font-light 
        tracking-wider text-white transition-all duration-300 hover:scale-105
        ${isCollapsed ? "w-10 h-10 p-0" : "w-[80%]"}`}
      onClick={() => navigate("/create")}
      title={isCollapsed ? "New Playlist" : undefined}
    >
      <Plus className="h-4 w-4 shrink-0" />
      {!isCollapsed && <span>New Playlist</span>}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768; 
  return (
    <>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
        />
      )}


      <div
        className={`
          flex items-center sticky top-0 h-screen
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-24" : "w-xs"}
          ${isMobile
            ? `fixed z-50 top-0 left-0 h-screen
               ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
               transition-transform duration-300`
            : ""
          }
        `}
      >
        <div
          className={`
            backdrop:bg-accentText mx-4 gap-5 flex h-[90%] flex-col 
            items-center justify-center 
            rounded-[40px] border bg-linear-to-b from-[#fbf7fc] from-50% to-white
            transition-all duration-300
            ${isCollapsed ? "w-full" : "w-xs"}
          `}
        >

          <button
            onClick={isMobile ? closeMobile : toggleCollapse}
            className={`self-end mr-4 mt-2 p-1.5 rounded-lg 
              text-secondaryText hover:text-accentText hover:bg-white/60
              transition-all duration-200  ${isMobile && !isMobileOpen ? "inline" : "hidden"}`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isMobile && isMobileOpen ? (
              <X className="w-5 h-5" />
            ) : isCollapsed ? (
              <Menu className="w-5 h-5 " />
            ) : (
              <Menu className="w-5 h-5 " />
            )}
          </button>

          <SidebarHead />
          <SideSub />
          {!isCollapsed && <SideFoot />}
          <NewPlaylistBtn />
        </div>
      </div>
    </>
  );
};

export default Sidebar;