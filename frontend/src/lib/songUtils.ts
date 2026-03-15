import type { BackendSong } from "@/features/songs/song.types";

export const formatSongDuration = (durationMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatSongAddedAt = (addedAt: string | null) => {
  if (!addedAt) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(addedAt));
};

export const formatTotalDuration = (durationMs: number) => {
  const totalMinutes = Math.floor(durationMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} mins`;
  }

  return `${hours} hr ${minutes} mins`;
};

export const getSongArtistLabel = (artists: string[]) => artists.join(", ");

export const sumSongDurations = (songs: BackendSong[]) =>
  songs.reduce((total, song) => total + song.durationMs, 0);
