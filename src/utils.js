import URI from 'urijs';
import { SPOTIFY_API, ACCESS_TOKEN_STORAGE_KEY, AUTHORIZE_URL } from './constants';

export const noop = () => {};

export const getCategoryPlaylistsUrl = categoryId => `${SPOTIFY_API}browse/categories/${categoryId}/playlists?limit=10`;
export const getPlaylistTracksUrl = playlistId => `${SPOTIFY_API}playlists/${playlistId}/tracks?limit=10`;

export const getUrlAccessToken = () => {
  const url = new URI(window.location);
  const fragment = url.fragment();
  const accessToken = fragment.split('&')[0].split('=')[1];

  return accessToken;
};

export const authorizeUser = () => {
  const accessToken = getUrlAccessToken();

  if (accessToken) {
    global.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  }
};

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
