import URI from 'urijs';
import { ACCESS_TOKEN_STORAGE_KEY } from './constants';

export const getUrlAccessToken = () => {
  const url = new URI(window.location);
  const fragment = url.fragment();
  const accessToken = fragment.split('&')[0].split('=')[1];

  return accessToken;
};

export const authorizeUser = () => {
  const accessToken = getUrlAccessToken();

  if (accessToken) {
    global.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  }
};
