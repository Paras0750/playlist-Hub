import React, { useCallback, useEffect, useState } from "react";
import TrackRow from "./TrackRow";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api";
import { subscribeToRefetchEvents } from "@/lib/refetchEvents";

type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationMs: number;
};

const TrackList: React.FC = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTracks = useCallback(async () => {
    try {
      if (!id) {
        setTracks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await api.get(`/playlists/${id}/tracks`);
      setTracks(res.data.tracks as Track[]);
    } catch (err) {
      console.error("Error fetching tracks:", err);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchTracks();
  }, [fetchTracks]);

  useEffect(() => {
    return subscribeToRefetchEvents((detail) => {
      if (detail.type === "playlistById" && detail.playlistId === id) {
        void fetchTracks();
      }
    });
  }, [fetchTracks, id]);

  if (loading) {
    return <div>Loading tracks...</div>;
  }

  return (
    <div>

      <div className="flex justify-between mx-2.5">
        <h2 className="text-xl font-semibold mb-4">Tracks</h2>
      <button
        className="bg-accentText text-white py-2 px-4 rounded-full hover:bg-purple-600 transition"
        onClick={() => navigate(`/add-songs?playlistId=${id}`)}
      >
        Add Track
      </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {tracks.length === 0 ? (
          <div className="px-6 py-10 text-center text-secondaryText">
            No tracks in this playlist yet.
          </div>
        ) : (
        tracks.map(track => (
          <TrackRow key={track.id} track={track} />
        ))
        )}

      </div>

    </div>
  );
};

export default TrackList;
