import { createSelector } from 'reselect';

const getRouteParam = param => (state, props) => props.match.params[param];

export const getRouteCategoryId = getRouteParam('categoryId');
export const getRoutePlaylistId = getRouteParam('playlistId');

const getIdFromProps = (state, props) => props.id;

const getCategories = state => state.categories;

const getCategoriesData = createSelector(
  getCategories,
  categories => categories.data,
);

export const getCategoryIds = createSelector(
  getCategories,
  categories => categories.ids,
);

export const getCategory = createSelector(
  getCategoriesData,
  getIdFromProps,
  (categoriesData, id) => categoriesData[id],
);

const getPlaylists = state => state.playlists;

const getCategoryPlaylists = createSelector(
  (state, props) => props.categoryId,
  getPlaylists,
  (categoryId, playlists) => playlists[categoryId] || {},
);

const getPlaylistsData = createSelector(
  getCategoryPlaylists,
  playlists => playlists.data,
);

const getRouteCategoryPlaylists = createSelector(
  getRouteCategoryId,
  getPlaylists,
  (routeCategoryId, playlists) => playlists[routeCategoryId] || {},
);

export const getPlaylistIds = createSelector(
  getRouteCategoryPlaylists,
  playlists => playlists.ids,
);

export const getPlaylist = createSelector(
  getPlaylistsData,
  getIdFromProps,
  (playlistsData, id) => playlistsData[id],
);

const getTracks = state => state.tracks;

const getPlaylistTracks = createSelector(
  (state, props) => props.playlistId,
  getTracks,
  (playlistId, tracks) => tracks[playlistId] || {},
);

const getTracksData = createSelector(
  getPlaylistTracks,
  tracks => tracks.data,
);

const getRoutePlaylistTracks = createSelector(
  getRoutePlaylistId,
  getTracks,
  (routePlaylistId, tracks) => tracks[routePlaylistId] || {},
);

export const getTrackIds = createSelector(
  getRoutePlaylistTracks,
  tracks => tracks.ids,
);

export const getTrack = createSelector(
  getTracksData,
  getIdFromProps,
  (tracksData, id) => tracksData[id],
);
