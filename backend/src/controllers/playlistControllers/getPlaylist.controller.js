import { apiSpotify } from "../../api/apiSpotify.js";
import { getSpotifyToken } from "../../services/spotify.service.js";

export const getPlaylist = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const offset = Math.floor(Math.random() * 1000); 

    const response = await apiSpotify.get(
      `/search?q=new&type=playlist&limit=10&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response1 = await apiSpotify.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
  console.log("User : ",response1)
    const playlists = response.data.playlists.items
      .filter((playlist) => playlist && playlist.name && playlist.images?.length)
      .map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description || "No description available",
        image: playlist.images?.[0]?.url || null,
        owner: playlist.owner?.display_name || "Unknown",
        tracks: playlist.tracks?.total || 0,
        url: playlist.external_urls?.spotify
      }));

    res.json([...playlists]);

  } catch (error) {
    console.log(error.message)
    res
      .status(error.response?.status || 500)
      .json({ error: error.message });
  }
};
export const getSinglePlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    const token = await getSpotifyToken();

    const response = await apiSpotify.get(
      `/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const playlist = response.data;
    if (!playlist || !playlist.name || !playlist.images?.length) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const playlistData = {
      id: playlist.id,
      name: playlist.name,
      link: playlist.href,
      description: playlist.description || "No description available",
      image: playlist.images?.[0]?.url || null,
      owner: playlist.owner|| "Unknown",
      tracks: playlist.tracks?.total || 0,
      url: playlist.external_urls?.spotify
    };

    res.json(playlistData);

  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: error.message });
  }
};
export const getPlaylistTracks = async (req, res) => {

  try {
    const  id  = '1Q6RA7Cf5kqR36HO4TrVkf';
    const token = await getSpotifyToken();
    console.log("hello")
    const response = await apiSpotify.get(`/playlists/${id}/items`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("this is : ",response)

    const tracks = response.data.items.map(item => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(a => a.name).join(", "),
      album: item.track.album.name,
      duration: item.track.duration_ms
    }));
    console.log("Tracks:", tracks);
    res.json({ tracks });

  } catch (error) {
    console.log("this is the error: ", error.message);
    res.status(500).json({ error: error.message });
  }
};