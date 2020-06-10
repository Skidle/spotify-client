import { GET_CATEGORIES } from '../constants';
import { sendRequest, getCategoryPlaylistsUrl, getPlaylistTracksUrl, transformCategories, transformPlaylists, transformTracks } from '../utils';

export const CATEGORIES_FETCH_START = 'CATEGORIES_FETCH_START';
export const CATEGORIES_FETCH_FAILURE = 'CATEGORIES_FETCH_FAILURE';
export const CATEGORIES_FETCH_SUCCESS = 'CATEGORIES_FETCH_SUCCESS';

export const PLAYLISTS_FETCH_START = 'PLAYLISTS_FETCH_START';
export const PLAYLISTS_FETCH_FAILURE = 'PLAYLISTS_FETCH_FAILURE';
export const PLAYLISTS_FETCH_SUCCESS = 'PLAYLISTS_FETCH_SUCCESS';

export const TRACKS_FETCH_START = 'TRACKS_FETCH_START';
export const TRACKS_FETCH_FAILURE = 'TRACKS_FETCH_FAILURE';
export const TRACKS_FETCH_SUCCESS = 'TRACKS_FETCH_SUCCESS';

const fetchCategoriesStart = () => ({
  type: CATEGORIES_FETCH_START,
});

const fetchCategoriesFailure = error => ({
  type: CATEGORIES_FETCH_FAILURE,
  error,
});

const fetchCategoriesSuccess = categories => ({
  type: CATEGORIES_FETCH_SUCCESS,
  categories,
});

export const fetchCategories = () => dispatch => {
  dispatch(fetchCategoriesStart());
  sendRequest(GET_CATEGORIES)
    .then(response => response.json())
    .then(({ categories }) => {
      const transformedCategories = transformCategories(categories);

      return dispatch(fetchCategoriesSuccess(transformedCategories));
    })
    .catch(error => dispatch(fetchCategoriesFailure(error)));
};

const fetchPlaylistsStart = categoryId => ({
  type: PLAYLISTS_FETCH_START,
  categoryId,
});

const fetchPlaylistsFailure = (error, categoryId) => ({
  type: PLAYLISTS_FETCH_FAILURE,
  error,
  categoryId,
});

const fetchPlaylistsSuccess = (playlists, categoryId) => ({
  type: PLAYLISTS_FETCH_SUCCESS,
  playlists,
  categoryId,
});

export const fetchPlaylists = categoryId => dispatch => {
  dispatch(fetchPlaylistsStart(categoryId));
  sendRequest(getCategoryPlaylistsUrl(categoryId))
    .then(response => response.json())
    .then(({ playlists }) => {
      const transformedPlaylists = transformPlaylists(playlists);

      return dispatch(fetchPlaylistsSuccess(transformedPlaylists, categoryId));
    })
    .catch(error => dispatch(fetchPlaylistsFailure(error, categoryId)));
};

const fetchTracksStart = playlistId => ({
  type: TRACKS_FETCH_START,
  playlistId,
});

const fetchTracksFailure = (error, playlistId) => ({
  type: TRACKS_FETCH_FAILURE,
  error,
  playlistId,
});

const fetchTracksSuccess = (tracks, playlistId) => ({
  type: TRACKS_FETCH_SUCCESS,
  tracks,
  playlistId,
});

export const fetchTracks = playlistId => dispatch => {
  dispatch(fetchTracksStart(playlistId));
  sendRequest(getPlaylistTracksUrl(playlistId))
    .then(response => response.json())
    .then(({ items }) => {
      const transformedTracks = transformTracks(items);
      return dispatch(fetchTracksSuccess(transformedTracks, playlistId));
    })
    .catch(error => dispatch(fetchTracksFailure(error, playlistId)));
};
