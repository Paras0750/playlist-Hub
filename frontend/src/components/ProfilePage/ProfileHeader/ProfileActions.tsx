import React from "react";
import { UserPlus, Share2 } from "lucide-react";

interface ProfileActionsProps {
  isOwnProfile: boolean;
  isFollowing: boolean;
  isFollowLoading: boolean;
  onFollow: () => void;
  onShare: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isOwnProfile,
  isFollowing,
  isFollowLoading,
  onFollow,
  onShare,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {!isOwnProfile && (
        <button
          type="button"
          onClick={onFollow}
          disabled={isFollowLoading}
          className="bg-primaryText text-white px-6 py-2 rounded-full flex hover:text-accentText items-center gap-2 hover:scale-105 cursor-pointer transition-transform duration-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <UserPlus size={16} />
          {isFollowLoading ? "Updating..." : isFollowing ? "Following" : "Follow"}
        </button>
      )}

      <button
        type="button"
        onClick={onShare}
        className="border px-6 py-2 rounded-full flex items-center gap-2 hover:text-accentText hover:scale-105 cursor-pointer transition-transform duration-200"
      >
        <Share2 size={16} />
        Share
      </button>
    </div>
  );
};

export default ProfileActions;
