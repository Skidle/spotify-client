import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Playlist from '../components/Playlist';
import { fetchPlaylists } from '../actions';

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

const mapStateToProps = (state, props) => ({
  playlists: state.playlists,
  categoryId: props.match.params.categoryId,
});

const mapDispatchToProps = dispatch => ({
  initFetch: categoryId => dispatch(fetchPlaylists(categoryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsContainer);
