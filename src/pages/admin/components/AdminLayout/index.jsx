import { Layout } from 'antd';
import { ROUTER_URL } from "constants/index";
import PrivateLayout from "layouts/PrivateLayout";
import AccountListPage from "pages/admin/AccountList";
import AddEditTypePage from "pages/admin/AddEditType";
import AddEditUserPage from "pages/admin/AddEditUser";
import BlogListPage from "pages/admin/BlogList";
import BookingListPage from "pages/admin/BookingList";
import CustomerListPage from "pages/admin/CustomerList";
import DashBoardPage from "pages/admin/Dashboard";
import DiscountListPage from "pages/admin/DiscountList";
import LocationListPage from "pages/admin/LocationList";
import RoomListPage from "pages/admin/RoomList";
import RoomTypesPage from "pages/admin/RoomTypes";
import NotFoundPage from "pages/user/NotFound";
import React from "react";
import { Switch, useRouteMatch, Redirect } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import BreadcrumbLayout from "../Breadcrumb";
import Sidebar from "../Sidebar";
import "./LayoutAdmin.scss";

const { Content } = Layout;

const LayoutAdmin = () => {
  const match = useRouteMatch();

  const isAuth = JSON.parse(localStorage.getItem("userData"))?.accessToken!==undefined;
  
  if (isAuth === true) {
    const userInfo = JSON.parse(localStorage.getItem("userData")).user;
    if (userInfo.role === "user") {
      return <NotFoundPage />;
    }

    return (
      <>
        <Layout className="site-layout">
          <Sidebar />

          <Layout className="site-layout-sub">
            <AdminHeader />

            <Content className="site-layout-content">
              <BreadcrumbLayout />
              <div className="site-layout-sub-background">
                <Switch>
                  <PrivateLayout
                    exact
                    path={`${match.path}`}
                    component={DashBoardPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.ROOMS}`}
                    component={RoomListPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.USERS}`}
                    component={AccountListPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.CUSTOMERS}`}
                    component={CustomerListPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.DISCOUNTS}`}
                    component={DiscountListPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.BLOGS}`}
                    component={BlogListPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.LOCATION}`}
                    component={LocationListPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.ROOM_TYPES}`}
                    component={RoomTypesPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.CREATE_TYPE}`}
                    component={AddEditTypePage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.EDIT_TYPE}`}
                    component={AddEditTypePage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.CREATE_USER}`}
                    component={AddEditUserPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.EDIT_USER}`}
                    component={AddEditUserPage}
                  />
                  <PrivateLayout
                    exact
                    path={`${match.path}${ROUTER_URL.BOOKINGS}`}
                    component={BookingListPage}
                  />

                  <NotFoundPage />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  } else {
    return <Redirect to={ROUTER_URL.LOGIN} />;
  }
};

export default LayoutAdmin;
