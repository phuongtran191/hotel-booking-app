import React from 'react';
import { useTranslation } from 'react-i18next';
import "./CardAbout.scss";
function CardAbout(props) {
  const {img,title,content} = props;
  const {t} = useTranslation();
  return (
    <div className="card-about">
      
        <div className="card-about__img">
          <img src={img} alt="" />
        </div>
        <div className="card-about__title">
          {t(title)}
        </div>
        <div className="card-about__content">
          {t(content)}
        </div>
    </div>
  );
}

export default CardAbout;