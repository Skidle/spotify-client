import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { fetchPlaylists } from '../actions';
import Playlist from '../components/Playlist';

const Playlists = ({ playlists, initFetch, categoryId }) => {
  useEffect(() => {
    initFetch(categoryId);
  }, [initFetch, categoryId]);

  return (
    <Row gutter={[24, 24]}>
      {playlists[categoryId]
        ? playlists[categoryId].items.map(({ id, name, description, images }) => (
          <Col key={id} span={6}>
            <Playlist name={name} image={images[0]} id={id} description={description} />
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

const mapDispatchToProps = (dispatch) => ({
  initFetch: (categoryId) => fetchPlaylists(dispatch, categoryId),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlists));
