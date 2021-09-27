import { IMAGES } from "constants/images.constants";
import { ROUTER_URL } from "constants/index";
import _ from "lodash";
import { Menu, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { logoutAction } from "redux/actions";
import { useSelector } from "react-redux";

function Header(props) {
  const dispatch = useDispatch();
  const [ScrollTop, setScrollTop] = useState(0);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("en");
  const handleChangeLang = (lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  let userInfo = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      _.debounce((e) => {
        setScrollTop(window.scrollY);
      }, 20)
    );
  }, [window.scrollY]);
  const menu = (
    <Menu>
      <Menu.Item>
        <Link rel="noopener noreferrer" className="user-item">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <p
          rel="noopener noreferrer"
          className="user-item"
          href=""
          onClick={() => dispatch(logoutAction())}
        >
          Logout
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={ScrollTop > 0 ? "header header__white" : "header"}>
      {/* <!-- navigation menu --> */}
      <div className="navbar">
        <div className="container">
          <div className="navbar__logo">
            <Link to={ROUTER_URL.HOME}>
              <img src={IMAGES.LOGO_HEADER_ADMIN} alt="Logo is not found!" />
            </Link>
          </div>
          <div className="navbar__list">
            <ul className="navbar__list-menu">
              <li className="navbar__list-item navbar__list-active ">
                <Link to={ROUTER_URL.HOME}>{t("home")}</Link>
              </li>
              <li className="navbar__list-item">
                <Link to={ROUTER_URL.HOME}>{t("about us")}</Link>
              </li>
              <li className="navbar__list-item">
                <Link to={ROUTER_URL.ROOMS}>{t("rooms")}</Link>
              </li>
              <li className="navbar__list-item">
                <Link to={ROUTER_URL.NEWS}>{t("news")}</Link>
              </li>
              <li className="navbar__list-item">
                <Link to={ROUTER_URL.CONTACT}>{t("contact")}</Link>
              </li>
            </ul>
            <div className="navbar__list-right">
              <div className="navbar__list-lang">
                <div className="dis-lang">
                  <div className="flag-img">
                    <img src={lang === "en" ? IMAGES.FlagEN : IMAGES.FlagVN} alt="" />
                  </div>
                  <span>{lang === "en" ? "English" : "Tiếng Việt"}</span>
                  <ul>
                    <li className="flag-item" onClick={() => handleChangeLang("vi")}>
                      <div className="flag-img">
                        <img src={IMAGES.FlagVN} alt="" />
                      </div>
                      <span>Tiếng Việt</span>
                    </li>
                    <li className="flag-item" onClick={() => handleChangeLang("en")}>
                      <div className="flag-img">
                        <img src={IMAGES.FlagEN} alt="" />
                      </div>
                      <span>English</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="navbar__list-user">
                {userInfo?.data?.user ? (
                  <div className="link-profile">
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <span>
                          <FaUserCircle />
                        </span>{" "}
                        <p>{userInfo.data.user.username}</p>
                      </a>
                    </Dropdown>
                  </div>
                ) : (
                  <Link to={ROUTER_URL.LOGIN} className="link-user">
                    {t("login")}
                  </Link>
                )}
              </div>
            </div>

            <label htmlFor="toggle-nav" className="navbar__icon-navbar">
              <span>
                <GiHamburgerMenu className="icon-menu" />
              </span>
              <h3>MENU</h3>
            </label>
          </div>
        </div>
        <input type="checkbox" name="toggle-nav" id="toggle-nav" />
        <div className="navbar__hidden">
          <ul className="navbar__hidden--list">
            <li className="navbar__list-item navbar__hidden--active">
              <Link to={ROUTER_URL.HOME}>{t("home")}</Link>
            </li>
            <li className="navbar__list-item">
              <Link to={ROUTER_URL.ROOMS}>{t("rooms")}</Link>
            </li>
            <li className="navbar__list-item">
              <Link to={ROUTER_URL.NEWS}>{t("news")}</Link>
            </li>
            <li className="navbar__list-item">
              <Link to={ROUTER_URL.ABOUT}>{t("about us")}</Link>
            </li>
            <li className="navbar__list-item">
              <Link to={ROUTER_URL.CONTACT}>{t("contact")}</Link>
            </li>
            <li className="navbar__list-item">
              <Link to={ROUTER_URL.LOGIN}>
                {" "}
                <button className="btn-login">{t("login")}</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
