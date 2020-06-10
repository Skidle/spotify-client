import { GET_CATEGORIES } from '../constants';
import { sendRequest, getCategoryPlaylistsUrl, getPlaylistTracksUrl } from '../utils';

export const fetchCategories = () => dispatch => {
  sendRequest(GET_CATEGORIES)
    .then(response => response.json())
    .then(({ categories }) => dispatch({ type: 'CATEGORIES_FETCH', categories }));
};

export const fetchPlaylists = categoryId => dispatch => {
  sendRequest(getCategoryPlaylistsUrl(categoryId))
    .then(response => response.json())
    .then(({ playlists }) => dispatch({ type: 'PLAYLISTS_FETCH', playlists, categoryId }));
};

export const fetchTracks = playlistId => dispatch => {
  sendRequest(getPlaylistTracksUrl(playlistId))
    .then(response => response.json())
    .then(({ items }) => dispatch({ type: 'TRACKS_FETCH', tracks: items, playlistId }));
};
