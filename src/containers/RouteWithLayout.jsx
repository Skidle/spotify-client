import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Spin } from 'antd';
import Layout from '../components/Layout';
import { AUTHORIZE_URL } from '../constants';

const RouteWithLayout = ({ isFetching, hasFailed, component: Component, ...other }) => {
  // if (hasFailed) {
  //   return (
  //     <Layout>
  //       <Empty />
  //     </Layout>
  //   );
  // }

  const isLoggedIn = true;

  return (
    <Route
      {...other}
      render={(props) => isLoggedIn ? (
        <Layout>
          {isFetching
            ? <Spin />
            : (
              <Component {...props} />
            )}
        </Layout>
      )
        : window.location.replace(AUTHORIZE_URL)
      }
    />
  );
};

export default connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(RouteWithLayout);
