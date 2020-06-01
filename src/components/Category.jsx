import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Category = ({ name, icon: { url } }) => (
  <Card
    hoverable
    style={{ width: '250px' }}
    cover={<img alt="Category icon" src={url} />}
  >
    <Meta title={name} />
  </Card>
);

export default Category;
