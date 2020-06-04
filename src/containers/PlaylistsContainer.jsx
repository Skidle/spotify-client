import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';
import { fetchPlaylists } from '../actions';
import { getPlaylists, getRouteCategoryId } from '../selectors';
import Playlist from '../components/Playlist';

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
              categoryId={categoryId}
              description={description}
            />
          </Col>
        ))
        : <span>Loading...</span>}
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  playlists: getPlaylists,
  categoryId: getRouteCategoryId,
});

const mapDispatchToProps = (dispatch) => ({
  initFetch: (categoryId) => fetchPlaylists(dispatch, categoryId),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsContainer);
