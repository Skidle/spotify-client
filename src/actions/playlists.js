import { PLAYLISTS_FETCH_SUCCESS, PLAYLISTS_FETCH_FAILURE, PLAYLISTS_FETCH_START } from './actionTypes';
import { getCategoryPlaylistsUrl, sendRequest } from './api';

export const fetchPlaylistsStart = categoryId => ({
  type: PLAYLISTS_FETCH_START,
  categoryId,
});

export const fetchPlaylistsFailure = ({ error, categoryId }) => ({
  type: PLAYLISTS_FETCH_FAILURE,
  error,
  categoryId,
});

export const fetchPlaylistsSuccess = ({ data, categoryId }) => {
  const playlistItems = data.items.reduce((object, item) => {
    const newObject = { ...object };
    const { id, name, images, description } = item;
    newObject[id] = {
      id,
      name,
      description,
      imageUrl: images[0].url,
    };
    return newObject;
  }, {});

  const ids = data.items.map(item => item.id);

  const playlists = {
    data: playlistItems,
    ids,
  };

  return { type: PLAYLISTS_FETCH_SUCCESS, playlists, categoryId };
};

export const fetchPlaylists = (dispatch, categoryId) => {
  dispatch(fetchPlaylistsStart(categoryId));
  sendRequest(getCategoryPlaylistsUrl(categoryId))
    .then(response => response.json())
    .then(({ playlists }) => dispatch(fetchPlaylistsSuccess({ data: playlists, categoryId })))
    .catch(error => dispatch(fetchPlaylistsFailure({ error, categoryId })));
};
