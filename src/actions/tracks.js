import { TRACKS_FETCH_SUCCESS, TRACKS_FETCH_FAILURE, TRACKS_FETCH_START } from './actionTypes';
import { getPlaylistTracksUrl, sendRequest } from './api';

export const fetchTracksStart = playlistId => ({
  type: TRACKS_FETCH_START,
  playlistId,
});

export const fetchTracksFailure = ({ error, playlistId }) => ({
  type: TRACKS_FETCH_FAILURE,
  error,
  playlistId,
});

export const fetchTracksSuccess = ({ data, playlistId }) => {
  const trackItems = data.reduce((object, { track }) => {
    const newObject = { ...object };
    const {
      id,
      name,
      description,
      artists,
      popularity,
      preview_url: previewUrl,
      album: { images },
    } = track;

    newObject[id] = {
      id,
      name,
      description,
      imageUrl: images[0].url,
      artistNames: artists.map(({ name: artistName }) => artistName),
      popularity,
      previewUrl,
    };
    return newObject;
  }, {});

  const ids = data.map(({ track }) => track.id);

  const tracks = {
    data: trackItems,
    ids,
  };

  return { type: TRACKS_FETCH_SUCCESS, tracks, playlistId };
};

export const fetchTracks = (dispatch, playlistId) => {
  dispatch(fetchTracksStart(playlistId));
  sendRequest(getPlaylistTracksUrl(playlistId))
    .then(response => response.json())
    .then(({ items }) => dispatch(fetchTracksSuccess({ data: items, playlistId })))
    .catch(error => dispatch(fetchTracksFailure({ error, playlistId })));
};
