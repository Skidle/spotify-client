import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List } from 'antd';
import { fetchTracks } from '../actions';
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

const mapStateToProps = (state, props) => ({
  tracks: state.tracks,
  playlistId: props.match.params.playlistId,
  categoryId: props.match.params.categoryId,
});

const mapDispatchToProps = (dispatch) => ({
  initFetch: (playlistId) => fetchTracks(dispatch, playlistId),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistTracksContainer));
