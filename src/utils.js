import URI from 'urijs';
import { SPOTIFY_API, ACCESS_TOKEN_STORAGE_KEY, AUTHORIZE_URL } from './constants';

export const getCategoryPlaylistsUrl = categoryId => `${SPOTIFY_API}browse/categories/${categoryId}/playlists?limit=10`;
export const getPlaylistTracksUrl = playlistId => `${SPOTIFY_API}playlists/${playlistId}/tracks?limit=10`;

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

export const sendRequest = url => {
  const token = getUrlAccessToken() || global.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  const request = new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return fetch(request)
    .then(response => {
      if (response.status === 401) {
        return window.location.replace(AUTHORIZE_URL);
      }
      return response;
    });
};

export const transformCategories = ({ items }) => {
  const categoryItems = items.reduce((acc, item) => {
    const { id, name, icons } = item;

    acc[id] = {
      id,
      name,
      imageUrl: icons[0].url,
    };

    return acc;
  }, {});

  const ids = items.map(item => item.id);

  return {
    data: categoryItems,
    ids,
  };
};

export const transformPlaylists = ({ items }) => {
  const playlistItems = items.reduce((acc, item) => {
    const { id, name, images, description } = item;

    acc[id] = {
      id,
      name,
      description,
      imageUrl: images[0].url,
    };

    return acc;
  }, {});

  const ids = items.map(item => item.id);

  return {
    data: playlistItems,
    ids,
  };
};

export const transformTracks = items => {
  const trackItems = items.reduce((acc, { track }) => {
    const {
      id,
      name,
      description,
      artists,
      popularity,
      preview_url: previewUrl,
      album: { images },
    } = track;

    acc[id] = {
      id,
      name,
      description,
      imageUrl: images[0].url,
      artistNames: artists.map(({ name: artistName }) => artistName),
      popularity,
      previewUrl,
    };

    return acc;
  }, {});

  const ids = items.map(({ track }) => track.id);

  return {
    data: trackItems,
    ids,
  };
};

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};
