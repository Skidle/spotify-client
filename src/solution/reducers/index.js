import { combineReducers } from 'redux';
import { USER_AUTHORIZED, CATEGORIES_FETCH, CATEGORY_PLAYLISTS_FETCH, PLAYLIST_TRACKS_FETCH } from '../actions/actionTypes';

const categories = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH:
      return {
        ...state,
        ...action.categories,
      };
    default:
      return state;
  }
};

const playlists = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_PLAYLISTS_FETCH:
      return {
        ...state,
        [action.categoryId]: { ...action.playlists },
      };
    default:
      return state;
  }
};

const tracks = (state = {}, action) => {
  switch (action.type) {
    case PLAYLIST_TRACKS_FETCH:
      return {
        ...state,
        [action.playlistId]: { ...action.tracks },
      };
    default:
      return state;
  }
};

const authorization = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTHORIZED:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  playlists,
  tracks,
  authorization,
});
