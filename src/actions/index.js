import URI from 'urijs';

export const CATEGORIES_FETCH = 'CATEGORIES_FETCH';
export const CATEGORY_PLAYLISTS_FETCH = 'CATEGORY_PLAYLISTS_FETCH';
export const PLAYLIST_TRACKS_FETCH = 'PLAYLIST_TRACKS_FETCH';

const SPOTIFY_API = 'https://api.spotify.com/v1/';
const GET_CATEGORIES = `${SPOTIFY_API}browse/categories?limit=10`;
const getCategoryPlaylistsUrl = (categoryId) => `${SPOTIFY_API}browse/categories/${categoryId}/playlists?limit=10`;
const getPlaylistTracksUrl = (playlistId) => `${SPOTIFY_API}playlists/${playlistId}/tracks?limit=10`;

const sendRequest = (url) => {
  const urlUri = new URI(window.location);
  const fragment = urlUri.fragment();
  const token = fragment.split('&')[0].split('=')[1];

  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCategories = (dispatch) => {
  fetch(sendRequest(GET_CATEGORIES))
    .then((response) => response.json())
    .then(({ categories }) => dispatch({ type: CATEGORIES_FETCH, categories }));
};

export const fetchPlaylists = (dispatch, categoryId) => {
  fetch(sendRequest(getCategoryPlaylistsUrl(categoryId)))
    .then((response) => response.json())
    .then(({ playlists }) => dispatch({ type: CATEGORY_PLAYLISTS_FETCH, playlists, categoryId }));
};

export const fetchTracks = (dispatch, playlistId) => {
  fetch(sendRequest(getPlaylistTracksUrl(playlistId)))
    .then((response) => response.json())
    .then(({ items }) => dispatch({ type: PLAYLIST_TRACKS_FETCH, tracks: items, playlistId }));
};
