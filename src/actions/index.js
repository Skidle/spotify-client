import { GET_CATEGORIES } from '../constants';
import { sendRequest, getCategoryPlaylistsUrl, getPlaylistTracksUrl, transformCategories, transformPlaylists, transformTracks } from '../utils';

export const fetchCategories = () => dispatch => {
  sendRequest(GET_CATEGORIES)
    .then(response => response.json())
    .then(({ categories }) => {
      const transformedCategories = transformCategories(categories);

      return dispatch({ type: 'CATEGORIES_FETCH', categories: transformedCategories });
    });
};

export const fetchPlaylists = categoryId => dispatch => {
  sendRequest(getCategoryPlaylistsUrl(categoryId))
    .then(response => response.json())
    .then(({ playlists }) => {
      const transformedPlaylists = transformPlaylists(playlists);

      return dispatch({ type: 'PLAYLISTS_FETCH', playlists: transformedPlaylists, categoryId });
    });
};

export const fetchTracks = playlistId => dispatch => {
  sendRequest(getPlaylistTracksUrl(playlistId))
    .then(response => response.json())
    .then(({ items }) => {
      const transformedTracks = transformTracks(items);
      return dispatch({ type: 'TRACKS_FETCH', tracks: transformedTracks, playlistId });
    });
};
