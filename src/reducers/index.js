import { combineReducers } from 'redux';

const categories = (state = {}, action) => {
  switch (action.type) {
    case 'CATEGORIES_FETCH':
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
    case 'PLAYLISTS_FETCH':
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
    case 'TRACKS_FETCH':
      return {
        ...state,
        [action.playlistId]: { ...action.tracks },
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
