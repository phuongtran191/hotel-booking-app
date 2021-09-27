import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import ReviewModal from "../ReviewModal";
import "./RoomReviews.scss";


// const options_rate = [
//   {
//     label: <Rate disabled allowHalf defaultValue={5} className="rate" />,
//     value: "5 Start",
//   },
//   {
//     label: <Rate disabled allowHalf defaultValue={4} className="rate" />,
//     value: "4 Start",
//   },
//   {
//     label: <Rate disabled allowHalf defaultValue={3} className="rate" />,
//     value: "3 Start",
//   },
//   {
//     label: <Rate disabled allowHalf defaultValue={2} className="rate" />,
//     value: "2 Start",
//   },
// ];
// const TimeOfYear = [
//   {
//     label: "Jan-Mar",
//     value: 1,
//   },
//   {
//     label: "Apr-Jun",
//     value: 2,
//   },
//   {
//     label: "Jul-Sep",
//     value: 3,
//   },
//   {
//     label: "Oct-Dec",
//     value: 4,
//   },
// ];

function RoomReviews(props) {
  const { t } = useTranslation();
  const [isShowReviewModal, setIsShowReviewModal] = useState(false);

  return (
    <div className="room-review">
      <div className="room-review__write">
        <div className="room-review__highlights">
          {`${4} Reviews`}
          <div className="highlights__stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <div className="room-review__btn">
          <button onClick={() => setIsShowReviewModal(true)} className="btn-review">
            {t("Write a Review")}
          </button>
        </div>
      </div>
      <ReviewModal
        isShowReviewModal={isShowReviewModal}
        setIsShowReviewModal={setIsShowReviewModal}
      />
      {/* <div className="room-review__filter">
        <div className="room-review__filter-item">
          <div className="room-review__title">
            {t("Guest Ratings")}
          </div>
          <Checkbox.Group options={options_rate} />
        </div>
         <div className="room-review__filter-item">
          <div className="room-review__title">
            {t("Time of Year")}
          </div>
          <Checkbox.Group options={TimeOfYear} />
        </div>
      </div> */}
    </div>
  );
}

export default RoomReviews;
