import React from "react";
import type { ProfileTab } from "@/features/profile/profile.types";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  showSavedTab: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  showSavedTab,
}) => {
  return (
    <div className="flex gap-8 mt-10 border-b border-neutral-200 pb-4 text-neutral-500">
      <button
        type="button"
        onClick={() => onTabChange("playlists")}
        className={`cursor-pointer font-semibold border-b-2 pb-2 transition-colors ${
          activeTab === "playlists"
            ? "border-primaryText text-primaryText"
            : "border-transparent text-secondaryText hover:border-primaryText"
        }`}
      >
        Shared Playlists
      </button>
      {showSavedTab && (
        <button
          type="button"
          onClick={() => onTabChange("saved")}
          className={`cursor-pointer font-semibold border-b-2 pb-2 transition-colors ${
            activeTab === "saved"
              ? "border-primaryText text-primaryText"
              : "border-transparent text-secondaryText hover:border-primaryText"
          }`}
        >
          Saved Favorites
        </button>
      )}
    </div>
  );
};

export default ProfileTabs;
