import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

const Playlist = ({
  image: { url },
  name,
  description,
  id,
  onClick,
}) => {
  const handleClick = () => onClick(id);

  return (
    <Link to={`/${id}`}>
      <Card
        hoverable
        style={{ width: '250px' }}
        cover={<img alt="Playlist" src={url} />}
        onClick={handleClick}
      >
        <Meta title={name} description={description} />
      </Card>
    </Link>
  );
};

export default Playlist;
