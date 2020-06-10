import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { noop } from '../utils';
import Playlist from '../components/Playlist';
import { playlists as DUMMY_PLAYLISTS } from '../dummy.json';

const PlaylistsContainer = ({ playlists, initFetch, categoryId }) => {
  useEffect(() => {
    initFetch(categoryId);
  }, [initFetch, categoryId]);

  return (
    <Row gutter={[24, 24]}>
      {playlists[categoryId]
        ? playlists[categoryId].items.map(({ id, name, description, images }) => (
          <Col key={id} span={6} xs={14} sm={12} md={9} lg={6}>
            <Playlist
              name={name}
              image={images[0]}
              id={id}
              description={description}
            />
          </Col>
        ))
        : <span>Loading...</span>}
    </Row>
  );
};

PlaylistsContainer.defaultProps = {
  initFetch: noop,
  playlists: DUMMY_PLAYLISTS,
  categoryId: 'pop',
};

export default PlaylistsContainer;
