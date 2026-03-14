import {apiSpotify} from "../../api/apiSpotify.js";
import { getSpotifyToken } from "../../services/spotify.service.js";
export const getAllSongs = async (req,res)=>{
    
  try {
    const token = await getSpotifyToken();

    const response = await apiSpotify.get('/search', {
      params: {
        q: req.query.search || 'punjabi',
        type: 'track',
        market: 'IN',
        limit: 10,
        offset: 0,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tracks = response.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((a) => a.name),
      album: track.album.name,
      cover: track.album.images[0]?.url,
      release_date: track.album.release_date,
      duration_ms: track.duration_ms,
      spotify_url: track.external_urls.spotify,
    }));

    res.json({ total: response.data.tracks.total, tracks });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Something went wrong';
    res.status(status).json({ error: message });
  }
}
