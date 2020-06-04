import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { List } from 'antd';
import { noop } from '../utils';
import Track from '../components/Track';

const PlaylistTracksContainer = ({ tracks, initFetch = noop, playlistId }) => {
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

export default withRouter(PlaylistTracksContainer);
