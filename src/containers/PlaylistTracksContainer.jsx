import React, { useEffect } from 'react';
import { List } from 'antd';
import { noop } from '../utils';
import Track from '../components/Track';
import { tracks as DUMMY_TRACKS } from '../dummy.json';

const PlaylistTracksContainer = ({ tracks = DUMMY_TRACKS, initFetch = noop, playlistId = '37i9dQZF1DX1kQODfnjf4u' }) => {
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

export default PlaylistTracksContainer;
