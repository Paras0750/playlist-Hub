import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div
      className="
        min-h-screen
        flex flex-col
        bg-gradient-to-br
        from-[#f2e9ff]
        via-[#f8f5ff]
        to-[#eef6ff]
      "
    >

        <Outlet />

      <footer className="text-center text-xs text-neutral-500 py-6">
        © PlaylistHub. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
