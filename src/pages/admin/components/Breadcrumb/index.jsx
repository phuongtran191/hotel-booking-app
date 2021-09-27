import { Breadcrumb } from 'antd';
// import history from 'utils/history';
import { ROUTER_URL } from 'constants/index';
import { MdAccountBalance, MdAssignmentTurnedIn, MdDashboard, MdEventAvailable, MdLocalHotel, MdPermIdentity, MdStyle } from "react-icons/md";
import { useLocation } from 'react-router';


const BREADCRUMB_MENU = [
  {
    title: "Dashboard",
    path: `${ROUTER_URL.ADMIN}`,
    icon: <MdDashboard />,
    subMenu: [],
  },
  {
    title: 'Room Manager',
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.ROOMS}`,
    icon: <MdLocalHotel />,
    subMenu: [],
  },
  {
    title: 'Type Manager',
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.ROOM_TYPES}`,
    icon: <MdAccountBalance />,
    subMenu: [],
  },
  {
    pathParent: `${ROUTER_URL.ADMIN}${ROUTER_URL.ROOM_TYPES}`,
    title: 'Add Type',
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.CREATE_TYPE}`
  },
  {
    pathParent: `${ROUTER_URL.ADMIN}${ROUTER_URL.ROOM_TYPES}`,
    title: 'Edit Type',
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.EDIT_TYPE}`
  },
  {
    title: 'Booking Manager',
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.BOOKINGS}`,
    icon: <MdEventAvailable />,
    subMenu: [],
  },
  {
    title: "Customer Manager",
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.CUSTOMERS}`,
    icon: <MdAssignmentTurnedIn />,
    subMenu: [],
  },
  {
    title: "Discount Manager",
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.DISCOUNTS}`,
    icon: <MdStyle />,
    subMenu: [],
  },
  {
    title: "Account Manager",
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.USERS}`,
    icon: <MdPermIdentity />,
    subMenu: [],
  },
  {
    pathParent: `${ROUTER_URL.ADMIN}${ROUTER_URL.USERS}`,
    title: 'Add User',
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.CREATE_USER}`
  },
  {
    pathParent: `${ROUTER_URL.ADMIN}${ROUTER_URL.USERS}`,
    title: 'Edit User',
    path: `${ROUTER_URL.ADMIN}${ROUTER_URL.EDIT_USER}`
  },
  // {
  //   title: 'Blogs Manager',
  //   path: `${ROUTER_URL.ADMIN}${ROUTER_URL.BLOGS}`,
  //   icon: <MdFiberNew />,
  //   subMenu: [],
  // }
]

function BreadcrumbLayout(props) {
  const location = useLocation();
  const path = location.pathname;
  
  function renderBreadcrumb(pathName) {

    return BREADCRUMB_MENU.map((menuItem, menuIndex) => {
      if (menuItem.path === pathName) {
        return (
          <>
            {menuItem.pathParent
              ? renderBreadcrumb(menuItem.pathParent) : null
            }
            <Breadcrumb.Item key={`breadcumb-${menuIndex}`}>
              {menuItem.title}
            </Breadcrumb.Item>
          </>
        )
      }
    })
  }
  return (
    <Breadcrumb style={{ margin: '20px 0' }}>
      <Breadcrumb.Item
        style={{ paddingLeft: "24px" }}
      >
        <MdDashboard /> Admin
      </Breadcrumb.Item>
      {renderBreadcrumb(path)}
    </Breadcrumb>
  )
}
export default BreadcrumbLayout;