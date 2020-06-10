import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Category from '../components/Category';
import { fetchCategories } from '../actions';
import { getCategoryIds } from '../selectors';

const CategoriesContainer = ({ initFetch, categoryIds }) => {
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (!categoryIds) {
    return <span>Loading...</span>;
  }

  return (
    <Row gutter={[24, 24]}>
      {categoryIds.map(id => (
        <Col key={id} span={6} xs={14} sm={10} md={9} lg={6}>
          <Category id={id} />
        </Col>
      ))}
    </Row>
  );
};

const mapStateToProps = state => ({
  categoryIds: getCategoryIds(state),
});

const mapDispatchToProps = dispatch => ({
  initFetch: () => dispatch(fetchCategories()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
