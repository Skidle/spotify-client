import { createSelector } from 'reselect';
import { STATUS_FETCHING } from '../constants';

export const getRouteParam = param => (state, props) => props.match.params[param];

export const getRouteCategoryId = getRouteParam('categoryId');
export const getRoutePlaylistId = getRouteParam('playlistId');

export const getCategories = state => state.categories;
export const getCategoriesData = createSelector(
  getCategories,
  categories => categories.data,
);

export const getCategoryIds = createSelector(
  getCategories,
  categories => categories.ids,
);

export const getCategory = createSelector(
  getCategoriesData,
  (state, props) => props.id,
  (categoriesData, id) => categoriesData[id],
);

export const getCategoriesStatus = createSelector(
  getCategories,
  categories => categories.status,
);

export const getPlaylists = state => state.playlists;

const getPlaylistsByCategoryId = getTypeOfCategoryId => createSelector(
  getTypeOfCategoryId,
  getPlaylists,
  (categoryId, playlists) => playlists[categoryId] || {},
);

export const getCategoryPlaylists = getPlaylistsByCategoryId((state, props) => props.categoryId);
export const getRouteCategoryPlaylists = getPlaylistsByCategoryId(getRouteCategoryId);

export const getRoutePlaylistIds = createSelector(
  getRouteCategoryPlaylists,
  playlists => playlists.ids,
);

export const getPlaylistsData = createSelector(
  getCategoryPlaylists,
  playlists => playlists.data,
);

export const getPlaylist = createSelector(
  getPlaylistsData,
  (state, props) => props.id,
  (playlistsData, id) => playlistsData[id],
);

export const getPlaylistsStatus = createSelector(
  getRouteCategoryPlaylists,
  playlists => playlists.status || STATUS_FETCHING,
);

export const getTracks = state => state.tracks;

const getTracksByPlaylistId = getTypeOfPlaylistId => createSelector(
  getTypeOfPlaylistId,
  getTracks,
  (playlistId, tracks) => tracks[playlistId] || {},
);

export const getPlaylistTracks = getTracksByPlaylistId((state, props) => props.playlistId);
export const getRoutePlaylistTracks = getTracksByPlaylistId(getRoutePlaylistId);

export const getRouteTrackIds = createSelector(
  getRoutePlaylistTracks,
  tracks => tracks.ids,
);

export const getTracksData = createSelector(
  getPlaylistTracks,
  tracks => tracks.data,
);

export const getTrack = createSelector(
  getTracksData,
  (state, props) => props.id,
  (tracksData, id) => tracksData[id],
);

export const getTracksStatus = createSelector(
  getRoutePlaylistTracks,
  tracks => tracks.status || STATUS_FETCHING,
);
