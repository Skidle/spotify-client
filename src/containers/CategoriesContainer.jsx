import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Category from '../components/Category';
import { fetchCategories } from '../actions';

const CategoriesContainer = ({ initFetch, categories }) => {
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <Row gutter={[24, 24]}>
      {categories.items ? categories.items.map(({ id, name, icons }) => (
        <Col key={id} span={6} xs={14} sm={10} md={9} lg={6}>
          <Category name={name} icon={icons[0]} id={id} />
        </Col>
      )) : <span>Loading...</span>}
    </Row>
  );
};

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  initFetch: () => dispatch(fetchCategories()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
