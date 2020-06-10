import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin, Empty, Button } from 'antd';
import Playlist from '../components/Playlist';
import { fetchPlaylists } from '../actions';
import { getPlaylistIds, getRouteCategoryId, getPlaylistsStatus } from '../selectors';

const PlaylistsContainer = ({ playlistIds, initFetch, categoryId, status }) => {
  useEffect(() => {
    initFetch(categoryId);
  }, [initFetch, categoryId]);

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
          <Button type="primary" onClick={() => initFetch(categoryId)}>Try again</Button>
        </Empty>
      </div>
    );
  }

  return (
    <Row gutter={[32, 32]} justify="center">
      {playlistIds.map(id => (
        <Col key={id} style={{ maxWidth: '300px' }}>
          <Playlist
            id={id}
            categoryId={categoryId}
          />
        </Col>
      ))}
    </Row>
  );
};

const mapStateToProps = (state, props) => ({
  playlistIds: getPlaylistIds(state, props),
  categoryId: getRouteCategoryId(state, props),
  status: getPlaylistsStatus(state, props),
});

const mapDispatchToProps = dispatch => ({
  initFetch: categoryId => dispatch(fetchPlaylists(categoryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsContainer);
