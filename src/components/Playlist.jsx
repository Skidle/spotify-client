import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

const Playlist = ({
  image: { url },
  name,
  description,
  id,
}) => (
  <Link to={`/playlist=${id}`}>
    <Card
      hoverable
      style={{ width: '250px' }}
      cover={<img alt="Playlist" src={url} />}
    >
      <Meta title={name} description={description} />
    </Card>
  </Link>
);

export default Playlist;
