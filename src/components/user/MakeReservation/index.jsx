import { DatePicker, Select } from "antd";
import { ROUTER_URL } from "constants/index";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListAction, getRoomVariable } from "redux/actions";
import { getBookingListAction } from "redux/actions/booking.action";
import { checkVariable } from "redux/constants";
import history from "utils/history";
import "./MakeReservation.scss";
const { Option } = Select;
const { RangePicker } = DatePicker;
const formatDate = "YYYY/MM/DD";


function MakeReservation({ isFocus = false }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const listRoom = useSelector((state) => state.roomReducer.roomList.data);
  const listBooking = useSelector((state) => state.bookingReducer.bookingList.data);

  const [infoCheck, setInfoCheck] = useState({ date: [undefined, undefined], guest: "" });

  useEffect(() => {
    dispatch(getBookingListAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRoomListAction());
  }, [dispatch]);

  useEffect(() => {
    setInfoCheck(
      JSON.parse(sessionStorage.getItem("checkVariable")) || { date: [null, null], guest: "" }
    );
  }, []);

  const handleCheckVariable = () => {
    if (infoCheck.date.length === 2 && infoCheck.guest !== 0) {
      const checkIn = new Date(infoCheck.date[0]).getTime();
      const checkOut = new Date(infoCheck.date[1]).getTime();
      const listVariable = checkVariable(checkIn, checkOut, listBooking, listRoom);
      dispatch(
        getRoomVariable({
          data: listVariable,
          checkIn: infoCheck.date[0],
          checkOut: infoCheck.date[1],
          guest: infoCheck.guest,
        })
      );
      sessionStorage.setItem("checkVariable", JSON.stringify(infoCheck));
      history.push(ROUTER_URL.ROOMS);
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  return (
    <div className="reservation">
      <div className="container">
        <div className="reservation__item">
          <div className="list__title">
            <div className="reservation__item-title">{t("CHECK-IN")}</div>
            <div className="reservation__item-title">{t("CHECK-OUT")}</div>
          </div>
          <RangePicker
            value={
              infoCheck.date[0] && [
                moment(infoCheck.date[0], formatDate),
                moment(infoCheck.date[1], formatDate),
              ]
            }
            disabledDate={disabledDate}
            onChange={(date, dateString) =>
              // console.log(dateString)
              setInfoCheck({
                ...infoCheck,
                date: dateString,
              })
            }
            format={formatDate}
            autoFocus={isFocus}
          />
        </div>
        <div className="reservation__item">
          <div className="reservation__item-title">{t("GUESTS")}</div>
          <Select
            value={infoCheck.guest !== "" ? `${infoCheck.guest} people` : "0 people"}
            className="reservation__select"
            placeholder="Number people"
            showSearch
            onChange={(values) => setInfoCheck({ ...infoCheck, guest: values })}
            optionFilterProp="children"
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">1 people</Option>
            <Option value="2">2 people</Option>
            <Option value="3">3 people</Option>
            <Option value="4">4 people</Option>
            <Option value="5">5 people</Option>
          </Select>
        </div>
        <div className="reservation__item">
          <button className="btn-check" onClick={() => handleCheckVariable()}>
            {t("CHECK AVAILABILITY")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeReservation;
