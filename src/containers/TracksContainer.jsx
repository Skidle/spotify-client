import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import Track from '../components/Track';
import { fetchTracks } from '../actions';
import { getTrackIds, getRoutePlaylistId } from '../selectors';

const TracksContainer = ({ trackIds, initFetch, playlistId }) => {
  useEffect(() => {
    initFetch(playlistId);
  }, [initFetch, playlistId]);

  if (!trackIds) {
    return <span>Loading...</span>;
  }

  return (
    <List>
      {trackIds.map(id => (
        <Track key={id} id={id} playlistId={playlistId} />
      ))}
    </List>
  );
};

const mapStateToProps = (state, props) => ({
  trackIds: getTrackIds(state, props),
  playlistId: getRoutePlaylistId(state, props),
});

const mapDispatchToProps = dispatch => ({
  initFetch: playlistId => dispatch(fetchTracks(playlistId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TracksContainer);
