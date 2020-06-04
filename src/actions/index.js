import { getAccessTokenFromUrl } from '../utils';
import { SPOTIFY_API, GET_CATEGORIES } from '../constants';

const getCategoryPlaylistsUrl = (categoryId) => `${SPOTIFY_API}browse/categories/${categoryId}/playlists?limit=10`;
const getPlaylistTracksUrl = (playlistId) => `${SPOTIFY_API}playlists/${playlistId}/tracks?limit=10`;

const sendRequest = (url) => {
  const token = getAccessTokenFromUrl();

  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCategories = () => {
  fetch(sendRequest(GET_CATEGORIES))
    .then((response) => response.json());
};

export const fetchPlaylists = (categoryId) => {
  fetch(sendRequest(getCategoryPlaylistsUrl(categoryId)))
    .then((response) => response.json());
};

export const fetchTracks = (playlistId) => {
  fetch(sendRequest(getPlaylistTracksUrl(playlistId)))
    .then((response) => response.json());
};
