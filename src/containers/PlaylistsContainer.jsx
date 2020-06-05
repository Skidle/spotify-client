import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';
import { fetchPlaylists } from '../actions';
import { getRoutePlaylistIds, getRouteCategoryId, getPlaylistsStatus } from '../selectors';
import { STATUS_FETCHING, STATUS_FAILURE } from '../constants';
import Playlist from '../components/Playlist';

const PlaylistsContainer = ({ playlistIds, initFetch, categoryId, status }) => {
  useEffect(() => {
    initFetch(categoryId);
  }, [initFetch, categoryId]);

  if (status === STATUS_FETCHING) {
    return <span>Loading...</span>;
  }

  if (status === STATUS_FAILURE) {
    return <span>Error</span>;
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

const mapStateToProps = createStructuredSelector({
  playlistIds: getRoutePlaylistIds,
  categoryId: getRouteCategoryId,
  status: getPlaylistsStatus,
});

const mapDispatchToProps = dispatch => ({
  initFetch: categoryId => fetchPlaylists(dispatch, categoryId),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsContainer);
