import React, { useEffect } from 'react';
import { List } from 'antd';
import { noop } from '../utils';
import Track from '../components/Track';
import { tracks as DUMMY_TRACKS } from '../dummy.json';

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

TracksContainer.defaultProps = {
  initFetch: noop,
  tracks: DUMMY_TRACKS,
  playlistId: '37i9dQZF1DX1kQODfnjf4u',
};

export default TracksContainer;
