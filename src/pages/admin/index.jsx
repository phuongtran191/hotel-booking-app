import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ROUTER_URL } from 'constants/index';
import RoomListPage from './RoomList';
import PrivateLayout from 'layouts/PrivateLayout';
import HomePage from 'pages/user/HomePage';

AdminPage.propTypes = {
  
};

function AdminPage(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
      <PrivateLayout exact path={`${match.path}${ROUTER_URL.ROOMS}`}  >
        
      </PrivateLayout>
      <PrivateLayout exact path={`${match.path}${ROUTER_URL.USER}`} component={HomePage} />
      <PrivateLayout exact path={ROUTER_URL.ADMIN} component={RoomListPage} />

      </Switch>
    </div>
  );
}

export default AdminPage;