import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Spin } from 'antd';
import Layout from '../components/Layout';

const RouteWithLayout = ({ isFetching, hasFailed, component: Component, ...other }) => {
  // if (hasFailed) {
  //   return (
  //     <Layout>
  //       <Empty />
  //     </Layout>
  //   );
  // }

  return (
    <Route
      {...other}
      render={(props) => (
        <Layout>
          {isFetching
            ? <Spin />
            : (
              <Component {...props} />
            )}
        </Layout>
      )}
    />
  );
};

export default connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(RouteWithLayout);
