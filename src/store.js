import { createStore } from 'redux';
import reducer from './reducers';
import { ACCESS_TOKEN_STORAGE_KEY } from './constants';

const initialState = {
  authorization: {
    accessToken: global.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
  },
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default store;
