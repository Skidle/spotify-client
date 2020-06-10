import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
      style={{ minWidth: '200px' }}
      cover={<img alt="Category" src={imageUrl} />}
    >
      <Meta title={name} />
    </Card>
  </Link>
);

const mapStateToProps = (state, { id }) => ({
  category: getCategory(state, { id }),
});

export default connect(
  mapStateToProps,
)(Category);
