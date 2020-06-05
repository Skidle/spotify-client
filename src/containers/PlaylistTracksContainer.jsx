import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List } from 'antd';
import { fetchTracks } from '../actions';
import { getRouteTrackIds, getRoutePlaylistId, getTracksStatus } from '../selectors';
import { STATUS_FETCHING, STATUS_FAILURE } from '../constants';
import Track from '../components/Track';

const PlaylistTracksContainer = ({ trackIds, initFetch, playlistId, status }) => {
  useEffect(() => {
    initFetch(playlistId);
  }, [initFetch, playlistId]);

  if (status === STATUS_FETCHING) {
    return <span>Loading...</span>;
  }

  if (status === STATUS_FAILURE) {
    return <span>Error</span>;
  }

  return (
    <List>
      {trackIds.map(id => (
        <Track key={id} id={id} playlistId={playlistId} />
      ))}
    </List>
  );
};

const mapStateToProps = createStructuredSelector({
  trackIds: getRouteTrackIds,
  playlistId: getRoutePlaylistId,
  status: getTracksStatus,
});

const mapDispatchToProps = dispatch => ({
  initFetch: playlistId => fetchTracks(dispatch, playlistId),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistTracksContainer);
