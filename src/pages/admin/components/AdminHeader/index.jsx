import { Dropdown, Layout, Menu, Row } from 'antd';
import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from 'redux/actions';
import history from 'utils/history';
import './HeaderAdmin.scss';


const { Header } = Layout;

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const accountMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/">
          Back to Home
        </Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Link to="/admin/profiles">
          Edit your Profile
        </Link>
      </Menu.Item> */}
      <Menu.Item>
        <Link onClick={() => {
            dispatch(logoutAction());
            history.push("/login");
          }}
        >
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );
  let userInfo = useSelector((state) => state.userReducer.userInfo);


  return (
    <Header
      className="site-layout-sub-header-background"
    >
      <Row justify="space-between"
        className="ant-row-header"
      >
        <h2>Royal Luxury Hotel</h2>
        <div className="ant-dropdown-link">
          <Dropdown
            overlay={accountMenu}
            placement="bottomCenter"
            arrow
          >
            <span>
              <FaUserCircle />
            </span>
          </Dropdown>
          <p>{userInfo.data.user.username}</p>
        </div>
      </Row>
    </Header>
  );
}

export default HeaderAdmin;
