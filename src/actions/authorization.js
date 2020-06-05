import { USER_AUTHORIZED } from './actionTypes';
import { getUrlAccessToken } from '../utils';
import { ACCESS_TOKEN_STORAGE_KEY } from '../constants';

export const authorizeUser = dispatch => {
  const accessToken = getUrlAccessToken();

  if (accessToken) {
    global.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    dispatch({ type: USER_AUTHORIZED, accessToken });
  }
};
