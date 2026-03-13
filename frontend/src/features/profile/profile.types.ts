import type { BackendPlaylist } from "@/features/playlist/playlist.types";

export type ProfileTab = "playlists" | "saved";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  followersCount: number;
  followingCount: number;
  totalSaves: number;
  isFollowing: boolean;
  isOwnProfile: boolean;
  playlists: BackendPlaylist[];
  savedPlaylists: BackendPlaylist[];
}
