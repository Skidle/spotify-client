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
    case 'CATEGORY_PLAYLISTS_FETCH':
      return {
        ...state,
        [action.categoryId]: { ...action.playlists },
      };
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  playlists,
});
