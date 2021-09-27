import { ROUTER_URL } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

PrivateLayout.propTypes = {
   exact: PropTypes.bool,
   path: PropTypes.string,
   component:PropTypes.func,
};

PrivateLayout.defaultProps = {
  exact: false,
  path: null,
  component:null,
};

function PrivateLayout(props) {
  const { exact, path, component: Component } = props;
  const isAuth = JSON.parse(localStorage.getItem("userData"))?.accessToken!==undefined;
  if (isAuth ===true)
  return (
    <Route exact={exact} path={path}>
        
        <Component/>
    
    </Route>

  );
  else
  return <Redirect to={ROUTER_URL.LOGIN} />
}

export default PrivateLayout;