import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import Category from '../components/Category';
import { noop } from '../utils';
import { categories as DUMMY_CATEGORIES } from '../dummy.json';

const CategoriesContainer = ({ initFetch = noop, categories = DUMMY_CATEGORIES }) => {
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

export default CategoriesContainer;
