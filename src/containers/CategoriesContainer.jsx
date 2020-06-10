import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin, Empty, Button } from 'antd';
import Category from '../components/Category';
import { fetchCategories } from '../actions';
import { getCategoryIds, getCategoriesStatus } from '../selectors';

const CategoriesContainer = ({ initFetch, categoryIds, status }) => {
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (status === 'fetching') {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'failure') {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', margin: '-90px 0 0 -100px' }}>
        <Empty>
          <Button type="primary" onClick={() => initFetch()}>Try again</Button>
        </Empty>
      </div>
    );
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

const mapStateToProps = (state, props) => ({
  categoryIds: getCategoryIds(state),
  status: getCategoriesStatus(state, props),
});

const mapDispatchToProps = dispatch => ({
  initFetch: () => dispatch(fetchCategories()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
