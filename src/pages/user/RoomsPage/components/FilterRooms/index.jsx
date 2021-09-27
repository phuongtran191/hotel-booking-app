import { Checkbox, Rate, Slider } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import "./FilterRooms.scss";

// const { Option } = Select;
const options_rate = [
  { label: <Rate disabled allowHalf defaultValue={5} className="rate" />, value: "5" },
  { label: <Rate disabled allowHalf defaultValue={4} className="rate" />, value: "4" },
  { label: <Rate disabled allowHalf defaultValue={3} className="rate" />, value: "3" },
  { label: <Rate disabled allowHalf defaultValue={2} className="rate" />, value: "2" },
];
const option_review = [
  { label: "City", value: "city" },
  { label: "Sea", value: "sea" },
  { label: "Mountains", value: "mountains" },
  { label: "Sky", value: "sky" },
  { label: "Other", value: "other" },
];
function FilterRooms({ checkedList, setCheckedList }) {
  const { t } = useTranslation();

  function onChangeStar(checkedValues) {
    setCheckedList({ ...checkedList, rating: checkedValues });
  }
  function onChangeReview(checkedValues) {
    setCheckedList({ ...checkedList, review: checkedValues });
  }
  function formatter(value) {
    return `${value * 100} USD`;
  }
  function handleClearFilter() {
    setCheckedList({ star: [], review: [], price: [0, 100] });
  }
  return (
    <div className="filter-room">
      <div className="filter-room__heading">
        <span>Filter</span>
        <span className="clear__filter" onClick={() => handleClearFilter()}>
          clear
        </span>
      </div>
      <div className="filter-room__rate">
        <div className="filter-room__title">{t("Star rating")}</div>
        <div className="filter-room__rate-list">
          <Checkbox.Group
            options={options_rate}
            value={checkedList.rating}
            onChange={onChangeStar}
          />
        </div>
      </div>
      <div className="filter-room__review">
        <div className="filter-room__title">{t("View score")}</div>
        <div className="filter-room__review-list">
          <Checkbox.Group
            options={option_review}
            value={checkedList.review}
            onChange={onChangeReview}
          />
        </div>
      </div>
      <div className="filter-room__Price">
        <div className="filter-room__title">{t("Price range")}</div>
        <div className="filter-room__Price-list">
          <Slider
            range
            value={checkedList.price}
            tipFormatter={formatter}
            onChange={(value) => setCheckedList({ ...checkedList, price: value })}
          />
          <div className="number-price">
            <span>0 USD</span>
            <span>10000 USD</span>
          </div>
        </div>
      </div>

      <div className="filter-room__options"></div>
    </div>
  );
}

export default FilterRooms;
