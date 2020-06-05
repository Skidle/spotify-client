import store from '../store';
import { getAccessToken } from '../selectors';
import { SPOTIFY_API } from '../constants';

export const getCategoryPlaylistsUrl = categoryId => `${SPOTIFY_API}browse/categories/${categoryId}/playlists?limit=10`;
export const getPlaylistTracksUrl = playlistId => `${SPOTIFY_API}playlists/${playlistId}/tracks?limit=10`;

export const sendRequest = url => {
  const state = store.getState();
  const token = getAccessToken(state);

  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
