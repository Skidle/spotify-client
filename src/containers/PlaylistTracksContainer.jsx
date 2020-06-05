import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List } from 'antd';
import { fetchTracks } from '../actions';
import { getTracks, getRouteCategoryId, getRoutePlaylistId } from '../selectors';
import Track from '../components/Track';

const PlaylistTracksContainer = ({ tracks, initFetch, playlistId }) => {
  useEffect(() => {
    initFetch(playlistId);
  }, [initFetch, playlistId]);

  return (
    <List>
      {tracks[playlistId]
        ? Object.entries(tracks[playlistId]).map(([, { track }]) => (
          <Track key={track.id} {...track} />
        ))
        : <span>Loading...</span>}
    </List>
  );
};

const mapStateToProps = createStructuredSelector({
  tracks: getTracks,
  playlistId: getRoutePlaylistId,
  categoryId: getRouteCategoryId,
});

const mapDispatchToProps = dispatch => ({
  initFetch: playlistId => fetchTracks(dispatch, playlistId),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistTracksContainer);
