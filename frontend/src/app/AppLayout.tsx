import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar/Sidebar";
import NavBar from "@/components/Navbar/navBar";

const AppLayout: React.FC = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        bg-gradient-to-br
        from-[#efe9ff]
        via-[#f6f3ff]
        to-[#e8f6ff]
      "
    >

      <aside className="w-72 shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AppLayout;
