import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { fetchCategories } from '../actions';
import Category from '../components/Category';

const CategoriesContainer = ({ onClick, categories }) => {
  useEffect(() => {
    onClick();
  }, [onClick]);

  return (
    <>
      <Row gutter={[24, 24]}>
        {categories.items ? categories.items.map((item) => (
          <Col key={item.id} span={6}>
            <Category name={item.name} icon={item.icons[0]} />
          </Col>
        )) : <span>Loading...</span>}
      </Row>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onClick: () => fetchCategories(dispatch),
});

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
