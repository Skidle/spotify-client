import { getAccessTokenFromUrl } from '../utils';
import { USER_AUTHORIZED, CATEGORIES_FETCH, CATEGORY_PLAYLISTS_FETCH, PLAYLIST_TRACKS_FETCH } from './actionTypes';
import store from '../store';
import { SPOTIFY_API, GET_CATEGORIES } from '../constants';

const getCategoryPlaylistsUrl = (categoryId) => `${SPOTIFY_API}browse/categories/${categoryId}/playlists?limit=10`;
const getPlaylistTracksUrl = (playlistId) => `${SPOTIFY_API}playlists/${playlistId}/tracks?limit=10`;

const sendRequest = (url) => {
  const token = getAccessTokenFromUrl() || store.getState().authorization.accessToken;

  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authorizeUser = (dispatch) => {
  const accessToken = getAccessTokenFromUrl();

  if (accessToken) {
    dispatch({ type: USER_AUTHORIZED, accessToken });
  }
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
