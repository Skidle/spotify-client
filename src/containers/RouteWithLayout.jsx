import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { authorizeUser } from '../utils';
import Layout from '../components/Layout';

const RouteWithLayout = ({ init, component: Component, ...other }) => {
  useEffect(() => {
    authorizeUser();
  }, [init]);

  return (
    <Route
      {...other}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
