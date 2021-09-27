import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

DefaultLayout.propTypes = {
   exact: PropTypes.bool,
   path: PropTypes.string,
   component:PropTypes.func,
};

DefaultLayout.defaultProps = {
  exact: false,
  path: null,
  component:null,
};

function DefaultLayout(props) {
  const { exact, path, component: Component } = props;
  return (
    <Route exact={exact} path={path}>
      <Header/>
        <Component/>
      <Footer/>
    </Route>

  );
}

export default DefaultLayout;