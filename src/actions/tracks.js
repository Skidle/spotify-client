import { PLAYLIST_TRACKS_FETCH } from './actionTypes';
import { getPlaylistTracksUrl, sendRequest } from './api';

export const fetchTracks = (dispatch, playlistId) => {
  fetch(sendRequest(getPlaylistTracksUrl(playlistId)))
    .then(response => response.json())
    .then(({ items }) => dispatch({ type: PLAYLIST_TRACKS_FETCH, tracks: items, playlistId }));
};
