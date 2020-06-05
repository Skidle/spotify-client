import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { getCategory } from '../selectors';

const { Meta } = Card;

const Category = ({
  category: {
    imageUrl,
    name,
  },
  id,
}) => (
  <Link to={`/category=${id}`}>
    <Card
      hoverable
      style={{ width: '250px' }}
      cover={<img alt="Category" src={imageUrl} />}
    >
      <Meta title={name} />
    </Card>
  </Link>
);

const mapStateToProps = createStructuredSelector({
  category: getCategory,
});

export default connect(
  mapStateToProps,
)(Category);
