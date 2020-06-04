import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { noop } from '../utils';
import Playlist from '../components/Playlist';

const PlaylistsContainer = ({ playlists, initFetch = noop, categoryId }) => {
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
              categoryId={categoryId}
              description={description}
            />
          </Col>
        ))
        : <span>Loading...</span>}
    </Row>
  );
};

export default withRouter(PlaylistsContainer);
