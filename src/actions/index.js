const TOKEN = 'BQAWMGttt3t2WjtRrP2D8-0ikj9LQaRQzi98admTX1zpCRCO00f0Qhi8a12sF5f7HIIVoiWpV2Nex-PMMDvleRA3H-LQ1CXsL6NNsQI4w7WT3X9d8hXH_i5RCvuqAuqcqFPGeqoi-dQ0YjTUnvVYXdp0jR6joElN5XU';
const GET_CATEGORIES = 'https://api.spotify.com/v1/browse/categories?limit=10';
const getCategoryPlaylistsUrl = (categoryId) => `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=10`;
const getPlaylistTracksUrl = (playlistId) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`;

const sendRequest = (url, token) => new Request(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const fetchCategories = (dispatch) => {
  fetch(sendRequest(GET_CATEGORIES, TOKEN))
    .then((response) => response.json())
    .then((json) => dispatch({ type: 'CATEGORIES_FETCH', categories: json.categories }));
};

export const fetchPlaylists = (dispatch, categoryId) => {
  fetch(sendRequest(getCategoryPlaylistsUrl(categoryId), TOKEN))
    .then((response) => response.json())
    .then((json) => dispatch({ type: 'CATEGORY_PLAYLISTS_FETCH', playlists: json.playlists, categoryId }));
};

export const fetchTracks = (dispatch, playlistId) => {
  fetch(sendRequest(getPlaylistTracksUrl(playlistId), TOKEN))
    .then((response) => response.json())
    .then((json) => dispatch({ type: 'PLAYLIST_TRACKS_FETCH', tracks: json.items, playlistId }));
};
