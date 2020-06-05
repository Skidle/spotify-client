import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';
import { fetchCategories } from '../actions';
import { getCategoryIds, getCategoriesStatus } from '../selectors';
import Category from '../components/Category';
import { STATUS_FETCHING, STATUS_FAILURE } from '../constants';

const CategoriesContainer = ({ initFetch, categoryIds, status }) => {
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (status === STATUS_FETCHING) {
    return <span>Loading...</span>;
  }

  if (status === STATUS_FAILURE) {
    return <span>Error</span>;
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

const mapDispatchToProps = dispatch => ({
  initFetch: () => fetchCategories(dispatch),
});

const mapStateToProps = createStructuredSelector({
  categoryIds: getCategoryIds,
  status: getCategoriesStatus,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
