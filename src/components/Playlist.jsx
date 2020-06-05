import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { getPlaylist } from '../selectors';

const { Meta } = Card;

const Playlist = ({
  playlist: {
    imageUrl,
    name,
    description,
  },
  id,
  categoryId,
}) => (
  <Link to={`/${categoryId}/${id}`}>
    <Card
      hoverable
      style={{ width: '250px' }}
      cover={<img alt="Playlist" src={imageUrl} />}
    >
      <Meta title={name} description={description} />
    </Card>
  </Link>
);

const mapStateToProps = createStructuredSelector({
  playlist: getPlaylist,
});

export default connect(
  mapStateToProps,
)(Playlist);
