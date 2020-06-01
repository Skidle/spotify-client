import React from 'react';
import { connect } from 'react-redux';
import { Empty, Spin } from 'antd';
import Layout from '../components/Layout';
import CategoriesContainer from './CategoriesContainer';

const Main = ({ isFetching, hasFailed }) => {
  if (hasFailed) {
    return (
      <Layout>
        <Empty />
      </Layout>
    );
  }

  return (
    <Layout>
      {isFetching
        ? <Spin />
        : (
          <CategoriesContainer />
        )}
    </Layout>
  );
};

export default connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(Main);
