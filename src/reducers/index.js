import { combineReducers } from 'redux';

const categories = (state = {}, action) => {
  switch (action.type) {
    case 'CATEGORIES_FETCH':
      return {
        ...action.categories,
      };
    default:
      return state;
  }
};

export default combineReducers({
  categories,
});
