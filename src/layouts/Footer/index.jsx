import { IMAGES } from "constants/images.constants";
import { ROUTER_URL } from "constants/index";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookSquare,
  FaInstagram,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaPinterest
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Footer.scss";
function Footer(props) {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__logo">
          <img src={IMAGES.LOGO} alt="oops...not found images!" />
        </div>
        <div className="footer__address">
          <div className="footer__title">{t("Address")}</div>
          <div className="footer__address-list">
            <div className="footer__address-item">
              <span>
                <FaMapMarkedAlt />
              </span>
              <p>25 Hòa Minh 28, Liên Chiểu, Đà Nẵng, VN</p>
            </div>
            <div className="footer__address-item">
              <span>
                <FaPhoneAlt />
              </span>
              <p>0964321806</p>
            </div>
            <div className="footer__address-item">
              <span>
                <IoMdMail />
              </span>
              <p>royalluxury@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="footer__menu">
          <div className="footer__title">{t("Useful link")}</div>
          <div className="footer__menu-list">
            <div className="footer__menu-item">
              <Link to={ROUTER_URL.HOME}>{t("home")}</Link>
            </div>
            <div className="footer__menu-item">
              <Link to={ROUTER_URL.ABOUT}>{t("about us")}</Link>
            </div>
            <div className="footer__menu-item">
              <Link to={ROUTER_URL.ROOMS}>{t("rooms")}</Link>
            </div>
            <div className="footer__menu-item">
              <Link to={ROUTER_URL.NEWS}>{t("news")}</Link>
            </div>
          </div>
        </div>
        <div className="footer__contact">
          <div className="footer__title">{t("Newsletter")}</div>
          <div className="footer__contact-form">
            <input type="text" className="footer__contact-input" />

            <div className="footer__contact-btn">
              <button>{t("submit")}</button>
            </div>
          </div>
          <div className="footer__contact-social">
            <Link to={ROUTER_URL.HOME}>
              <span className="icon-facebook">
                <FaFacebookSquare />
              </span>
            </Link>
            <Link to={ROUTER_URL.HOME}>
              <span className="icon-instagram">
                <FaInstagram />
              </span>
            </Link>
            <Link to={ROUTER_URL.HOME}>
              <span className="icon-printerest">
                <FaPinterest />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
