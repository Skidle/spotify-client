import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

const Category = ({
  icon: { url },
  name,
  id,
}) => (
  <Link to={`/${id}`}>
    <Card
      hoverable
      style={{ width: '250px' }}
      cover={<img alt="Category icon" src={url} />}
      // onClick={handleClick}
    >
      <Meta title={name} />
    </Card>
  </Link>
);

export default Category;
