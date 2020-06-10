import { combineReducers } from 'redux';
import { createReducer } from '../utils';
import {
  CATEGORIES_FETCH_START,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAILURE,
  PLAYLISTS_FETCH_START,
  PLAYLISTS_FETCH_SUCCESS,
  PLAYLISTS_FETCH_FAILURE,
  TRACKS_FETCH_START,
  TRACKS_FETCH_SUCCESS,
  TRACKS_FETCH_FAILURE,
} from '../actions';

const categories = createReducer({}, {
  [CATEGORIES_FETCH_START]: state => ({
    ...state,
    status: 'fetching',
  }),
  [CATEGORIES_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    ...action.categories,
    status: 'success',
  }),
  [CATEGORIES_FETCH_FAILURE]: state => ({
    ...state,
    status: 'failure',
  }),
});

const playlists = createReducer({}, {
  [PLAYLISTS_FETCH_START]: (state, action) => ({
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      status: 'fetching',
    },
  }),
  [PLAYLISTS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      ...action.playlists,
      status: 'success',
    },
  }),
  [PLAYLISTS_FETCH_FAILURE]: (state, action) => ({
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      status: 'failure',
    },
  }),
});

const tracks = createReducer({}, {
  [TRACKS_FETCH_START]: (state, action) => ({
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      status: 'fetching',
    },
  }),
  [TRACKS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      ...action.tracks,
      status: 'success',
    },
  }),
  [TRACKS_FETCH_FAILURE]: (state, action) => ({
    ...state,
    [action.playlistId]: {
      ...state[action.playlistId],
      status: 'failure',
    },
  }),
});

export default combineReducers({
  categories,
  playlists,
  tracks,
});
