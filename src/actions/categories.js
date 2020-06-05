import { CATEGORIES_FETCH_SUCCESS, CATEGORIES_FETCH_FAILURE, CATEGORIES_FETCH_START } from './actionTypes';
import { sendRequest } from './api';
import { GET_CATEGORIES } from '../constants';

export const fetchCategoriesStart = () => ({
  type: CATEGORIES_FETCH_START,
});

export const fetchCategoriesFailure = error => ({
  type: CATEGORIES_FETCH_FAILURE,
  error,
});

export const fetchCategoriesSuccess = data => {
  const categoryItems = data.items.reduce((object, item) => {
    const newObject = { ...object };
    const { id, name, icons } = item;
    newObject[id] = {
      id,
      name,
      imageUrl: icons[0].url,
    };
    return newObject;
  }, {});

  const ids = data.items.map(item => item.id);

  const categories = {
    data: categoryItems,
    ids,
  };

  return { type: CATEGORIES_FETCH_SUCCESS, categories };
};

export const fetchCategories = dispatch => {
  dispatch(fetchCategoriesStart());
  fetch(sendRequest(GET_CATEGORIES))
    .then(response => response.json())
    .then(({ categories }) => dispatch(fetchCategoriesSuccess(categories)))
    .catch(error => dispatch(fetchCategoriesFailure(error)));
};
