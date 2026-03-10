export type SpotifyOwner = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  link: string;
  description: string;
  image: string;
  owner: SpotifyOwner;
  tracks: number;
  url: string;
};