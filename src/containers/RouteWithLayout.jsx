import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { authorizeUser } from '../actions';
import Layout from '../components/Layout';
import { AUTHORIZE_URL } from '../constants';
import { getAccessTokenFromUrl } from '../utils';

const RouteWithLayout = ({ isUserAuthorized, init, component: Component, ...other }) => {
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

const mapStateToProps = (state) => {
  const accessToken = getAccessTokenFromUrl();

  return ({
    isUserAuthorized: !!state.authorization.accessToken || !!accessToken,
  });
};

const mapDispatchToProps = (dispatch) => ({
  init: () => authorizeUser(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteWithLayout);
