export interface BackendSong {
  spotifyId: string;
  name: string;
  artists: string[];
  album: string;
  durationMs: number;
  coverImageUrl: string;
  spotifyUrl: string;
  addedAt: string | null;
}

export interface SearchTrack {
  id: string;
  name: string;
  artists: string[];
  album: string;
  cover: string | null;
  duration_ms: number;
  spotify_url: string;
  release_date?: string;
}

export interface SongLibraryPlaylist {
  _id: string;
  name: string;
  description: string;
  coverImage: string;
  updatedAt: string;
  songs: BackendSong[];
}

export interface SongLibraryResponse {
  savedSongs: BackendSong[];
  playlists: SongLibraryPlaylist[];
}

export type AddSongsTarget =
  | { type: "saved" }
  | { type: "playlist"; playlistId: string };
