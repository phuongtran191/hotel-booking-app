import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import {GoCalendar} from "react-icons/go";
import {FiUser} from "react-icons/fi"
import "./CardBlog.scss"
function CardBlog(props) {
  const { img, title, author, description, time } = props;
  const { t } = useTranslation();
  return (
    <div className="blog">
      <div className="blog__img">
        <img src={img} alt="" />
      </div>
      <div className="blog__content">
        <div className="blog__content-info">
          <div className="time"><GoCalendar />{" "}{moment(Date(time).toLocaleString()).format('MM/DD/YYYY')}</div>
          <div className="author"><FiUser /> {" "}{author}</div>
        </div>
        <div className="blog__content-title">{t(title)}</div>
        <div className="blog__content-description">{t(description)}</div>
      </div>
    </div>
  );
}

export default CardBlog;
