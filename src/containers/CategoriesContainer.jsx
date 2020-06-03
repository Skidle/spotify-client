import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { fetchCategories } from '../actions';
import Category from '../components/Category';

const CategoriesContainer = ({ initFetch, categories }) => {
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <Row gutter={[24, 24]}>
      {categories.items ? categories.items.map(({ id, name, icons }) => (
        <Col key={id} span={6}>
          <Category name={name} icon={icons[0]} id={id} />
        </Col>
      )) : <span>Loading...</span>}
    </Row>
  );
};

const mapDispatchToProps = (dispatch) => ({
  initFetch: () => fetchCategories(dispatch),
});

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
