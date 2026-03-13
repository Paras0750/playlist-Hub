export interface AuthState {
  user: {
    id: string;
    name: string;
    image: string;
    isAuthenticated: boolean;
    savedPlaylists: string[];
  };
  loading: boolean;
}
