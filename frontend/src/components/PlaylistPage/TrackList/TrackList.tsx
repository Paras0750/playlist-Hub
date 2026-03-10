import React, { useEffect, useState } from "react";
import TrackRow from "./TrackRow";
import { useParams } from "react-router-dom";
import api from "@/services/api";

type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
};

const TrackList: React.FC = () => {

  const { id } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTracks = async () => {
      try {

        if (!id) return;

        const res = await api.get(`/playlists/${id}/tracks`);

        setTracks(res.data.tracks);

      } catch (err) {
        console.error("Error fetching tracks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();

  }, [id]);

  if (loading) {
    return <div>Loading tracks...</div>;
  }

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">Tracks</h2>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {tracks.map(track => (
          <TrackRow key={track.id} track={track} />
        ))}

      </div>

    </div>
  );
};

export default TrackList;