import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
}) => (
  <Link to={`/playlist=${id}`}>
    <Card
      hoverable
      style={{ width: '250px' }}
      cover={<img alt="Playlist" src={imageUrl} />}
    >
      <Meta title={name} description={description} />
    </Card>
  </Link>
);

const mapStateToProps = (state, props) => ({
  playlist: getPlaylist(state, props),
});

export default connect(
  mapStateToProps,
)(Playlist);
