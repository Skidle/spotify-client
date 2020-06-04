import { createSelector } from 'reselect';
import { getUrlAccessToken } from '../utils';

export const getCategories = (state) => state.categories;

export const getPlaylists = (state) => state.playlists;

export const getTracks = (state) => state.tracks;

export const getAuthorization = (state) => state.authorization;

export const getStoredAccessToken = createSelector(
  getAuthorization,
  (authorization) => authorization.accessToken,
);

export const isUserAuthorized = createSelector(
  getStoredAccessToken,
  getUrlAccessToken,
  (storedToken, urlToken) => !!storedToken || !!urlToken,
);

export const getRouteParam = (param) => (state, props) => props.match.params[param];

export const getRouteCategoryId = getRouteParam('categoryId');
export const getRoutePlaylistId = getRouteParam('playlistId');
