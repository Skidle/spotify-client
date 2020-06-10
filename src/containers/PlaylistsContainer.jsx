import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Playlist from '../components/Playlist';
import { fetchPlaylists } from '../actions';
import { getPlaylistIds, getRouteCategoryId } from '../selectors';

const PlaylistsContainer = ({ playlistIds, initFetch, categoryId }) => {
  useEffect(() => {
    initFetch(categoryId);
  }, [initFetch, categoryId]);

  if (!playlistIds) {
    return <span>Loading...</span>;
  }

  return (
    <Row gutter={[24, 24]}>
      {playlistIds.map(id => (
        <Col key={id} span={6} xs={14} sm={12} md={9} lg={6}>
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
});

const mapDispatchToProps = dispatch => ({
  initFetch: categoryId => dispatch(fetchPlaylists(categoryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsContainer);
