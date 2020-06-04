import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import { AUTHORIZE_URL } from '../constants';

const RouteWithLayout = ({ isUserAuthorized = true, init, component: Component, ...other }) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <Route
      {...other}
      render={(props) => (isUserAuthorized
        ? (
          <Layout>
            <Component {...props} />
          </Layout>
        )
        : window.location.replace(AUTHORIZE_URL))}
    />
  );
};

export default RouteWithLayout;
