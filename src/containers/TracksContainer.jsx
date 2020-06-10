import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import Track from '../components/Track';
import { fetchTracks } from '../actions';

const TracksContainer = ({ tracks, initFetch, playlistId }) => {
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

const mapStateToProps = (state, props) => ({
  tracks: state.tracks,
  playlistId: props.match.params.playlistId,
});

const mapDispatchToProps = dispatch => ({
  initFetch: playlistId => dispatch(fetchTracks(playlistId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TracksContainer);
