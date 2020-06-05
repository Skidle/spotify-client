import { USER_AUTHORIZED } from './actionTypes';
import { getUrlAccessToken } from '../utils';

export const authorizeUser = dispatch => {
  const accessToken = getUrlAccessToken();

  if (accessToken) {
    dispatch({ type: USER_AUTHORIZED, accessToken });
  }
};
