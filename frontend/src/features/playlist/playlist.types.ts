export interface Playlist {
  title: string;
  description: string;
  image: string|null;
  imageFile : File |null
  likes?: string[];     
  songs?: string[];
  tags ?: string[];
  featured?: boolean;
  visibility : string;
}

