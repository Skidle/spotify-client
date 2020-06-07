import { SPOTIFY_API, AUTHORIZE_URL, ACCESS_TOKEN_STORAGE_KEY } from '../constants';
import { getUrlAccessToken } from '../utils';

export const getCategoryPlaylistsUrl = categoryId => `${SPOTIFY_API}browse/categories/${categoryId}/playlists?limit=10`;
export const getPlaylistTracksUrl = playlistId => `${SPOTIFY_API}playlists/${playlistId}/tracks?limit=10`;

export const sendRequest = url => {
  const token = getUrlAccessToken() || global.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  const request = new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return fetch(request)
    .then(response => {
      if (response.status === 401) {
        return window.location.replace(AUTHORIZE_URL);
      }
      return response;
    });
};
