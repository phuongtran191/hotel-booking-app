import React from "react";
import { useTranslation } from "react-i18next";
import "./CardFeedBack.scss";
import { AiOutlineCheck } from "react-icons/ai";
function CardFeedBack(props) {
  const { name, img, job, review } = props;
  const { t } = useTranslation();
  return (
    <div className="feedback">
      <div className="feedback__user">
        <div className="user">
          <div className="feedback__img">
            <img src={img} alt="" />
          </div>
          <div className="tick">
            <span>
              {" "}
              <AiOutlineCheck />
            </span>
          </div>
        </div>
        <div className="feedback__name">{name}</div>
        <div className="feedback__job">{t(job)}</div>
        <div className="feedback__content">"{t(review)}"</div>
      </div>
    </div>
  );
}

export default CardFeedBack;
