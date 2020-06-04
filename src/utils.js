import URI from 'urijs';

export const getAccessTokenFromUrl = () => {
  const url = new URI(window.location);
  const fragment = url.fragment();
  const accessToken = fragment.split('&')[0].split('=')[1];

  return accessToken;
};
