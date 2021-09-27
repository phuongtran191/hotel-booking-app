import React from "react";
import { useTranslation } from "react-i18next";
import "./CardRoom.scss";
function CardRoom(props) {
  const { t } = useTranslation();
  const { dataAos, title, content, price, img, isImgTop } = props;
  if (isImgTop) {
    return (
      <div
        className="room"
        data-aos={dataAos}
        data-aos-easing="linear"
        data-aos-delay="500"
        data-aos-duration="500"
      >
        <div className="room__img">
          <img src={img} alt="" />
        </div>
        <div className="room__content">
          <h3 className="room__content-title">{t(title)}</h3>
          <p className="room__content-description">{t(content)}</p>
          <div className="room__content-price">
            <div className="price">
              {price}/{t("Night")}
            </div>
            <div className="btn-book">
              <button>{t("Book now")}</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="room"
        data-aos={dataAos}
        data-aos-easing="linear"
        data-aos-delay="500"
        data-aos-duration="500"
      >
        <div className="room__content">
          <h3 className="room__content-title">{t(title)}</h3>
          <p className="room__content-description">{t(content)}</p>
          <div className="room__content-price">
            <div className="price">
              {price}/{t("Night")}
            </div>
            <div className="btn-book">
              <button>{t("Book now")}</button>
            </div>
          </div>
        </div>

        <div className="room__img">
          <img src={img} alt="" />
        </div>
      </div>
    );
  }
}

export default CardRoom;
