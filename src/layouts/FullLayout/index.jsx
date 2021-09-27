import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

FullLayout.propTypes = {
   exact: PropTypes.bool,
   path: PropTypes.string,
   component:PropTypes.func,
};

FullLayout.defaultProps = {
  exact: false,
  path: null,
  component:null,
};

function FullLayout(props) {
  const { exact, path, component: Component } = props;
  return (
    <Route exact={exact} path={path}>
    
        <Component/>
    
    </Route>

  );
}

export default FullLayout;