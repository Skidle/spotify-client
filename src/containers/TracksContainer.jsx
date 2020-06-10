import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List, Spin, Empty, Button } from 'antd';
import Track from '../components/Track';
import { fetchTracks } from '../actions';
import { getTrackIds, getRoutePlaylistId, getTracksStatus } from '../selectors';

const TracksContainer = ({ trackIds, initFetch, playlistId, status }) => {
  useEffect(() => {
    initFetch(playlistId);
  }, [initFetch, playlistId]);

  if (status === 'fetching') {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'failure') {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', margin: '-90px 0 0 -100px' }}>
        <Empty>
          <Button type="primary" onClick={() => initFetch(playlistId)}>Try again</Button>
        </Empty>
      </div>
    );
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
  status: getTracksStatus(state, props),
});

const mapDispatchToProps = dispatch => ({
  initFetch: playlistId => dispatch(fetchTracks(playlistId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TracksContainer);
