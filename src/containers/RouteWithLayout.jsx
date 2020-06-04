import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route } from 'react-router-dom';
import { authorizeUser } from '../actions';
import { isUserAuthorized as isUserAuthorizedSelector } from '../selectors';
import Layout from '../components/Layout';
import { AUTHORIZE_URL } from '../constants';

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

const mapStateToProps = createStructuredSelector({
  isUserAuthorized: isUserAuthorizedSelector,
});

const mapDispatchToProps = (dispatch) => ({
  init: () => authorizeUser(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteWithLayout);
