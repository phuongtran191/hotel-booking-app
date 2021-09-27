import AOS from "aos";
import "aos/dist/aos.css";
import { ROUTER_URL } from "constants/index";
import DefaultLayout from "layouts/DefaultLayout";
import FullLayout from "layouts/FullLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AdminLayout from "pages/admin/components/AdminLayout";
import BookingPage from "pages/user/BookingPage";
import HomePage from "pages/user/HomePage";
import LoginPage from "pages/user/LoginPage";
import NotFound from "pages/user/NotFound";
// import PaymentPage from "pages/user/BookingPage/components/PaymentPage";
import RoomDetailPage from "pages/user/RoomDetailPage";
import RoomsPage from "pages/user/RoomsPage";
import UserProfile from "pages/user/UserProfile";
import { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "utils/history";
import "./App.css";

function App() {
 

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <DefaultLayout exact path={ROUTER_URL.HOME} component={HomePage} />
          <DefaultLayout exact path={ROUTER_URL.ROOMS} component={RoomsPage} />
          <DefaultLayout exact path={ROUTER_URL.ROOM} component={RoomDetailPage} />

          <PrivateLayout path={ROUTER_URL.PROFILE} component={UserProfile} />
          <PrivateLayout path={ROUTER_URL.ADMIN} component={AdminLayout} />
          <PrivateLayout path={ROUTER_URL.BOOKING} component={BookingPage} />
          <PrivateLayout path={ROUTER_URL.PAYMENT} component={BookingPage} />

          <FullLayout exact path={ROUTER_URL.LOGIN} component={LoginPage} />
          <FullLayout exact path={ROUTER_URL.REGISTER} component={LoginPage} />

          <DefaultLayout exact path={ROUTER_URL.HOME} component={HomePage} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
