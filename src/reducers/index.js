import { combineReducers } from 'redux';
import { CATEGORIES_FETCH_SUCCESS, CATEGORIES_FETCH_FAILURE, CATEGORIES_FETCH_START, PLAYLISTS_FETCH_SUCCESS, PLAYLISTS_FETCH_FAILURE, PLAYLISTS_FETCH_START, TRACKS_FETCH_SUCCESS, TRACKS_FETCH_FAILURE, TRACKS_FETCH_START } from '../actions/actionTypes';
import { STATUS_FETCHING, STATUS_SUCCESS, STATUS_FAILURE } from '../constants';

const initialEntitiesState = {
  data: {},
  ids: [],
  status: '',
};

const categories = (state = initialEntitiesState, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH_START:
      return {
        ...state,
        status: STATUS_FETCHING,
      };
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.categories,
        status: STATUS_SUCCESS,
      };
    case CATEGORIES_FETCH_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      };
    default:
      return state;
  }
};

const playlists = (state = {}, action) => {
  switch (action.type) {
    case PLAYLISTS_FETCH_START:
      return {
        ...state,
        [action.categoryId]: {
          ...state[action.categoryId],
          status: STATUS_FETCHING,
        },
      };
    case PLAYLISTS_FETCH_SUCCESS:
      return {
        ...state,
        [action.categoryId]: {
          ...state[action.categoryId],
          ...action.playlists,
          status: STATUS_SUCCESS,
        },
      };
    case PLAYLISTS_FETCH_FAILURE:
      return {
        ...state,
        [action.categoryId]: {
          ...state[action.categoryId],
          status: STATUS_FAILURE,
        },
      };
    default:
      return state;
  }
};

const tracks = (state = {}, action) => {
  switch (action.type) {
    case TRACKS_FETCH_START:
      return {
        ...state,
        [action.playlistId]: {
          ...state[action.playlistId],
          status: STATUS_FETCHING,
        },
      };
    case TRACKS_FETCH_SUCCESS:
      return {
        ...state,
        [action.playlistId]: {
          ...state[action.playlistId],
          ...action.tracks,
          status: STATUS_SUCCESS,
        },
      };
    case TRACKS_FETCH_FAILURE:
      return {
        ...state,
        [action.playlistId]: {
          ...state[action.playlistId],
          status: STATUS_FAILURE,
        },
      };
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  playlists,
  tracks,
});