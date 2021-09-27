import { Progress } from "antd";
import { IMAGES } from "constants/images.constants";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaShower } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoIosBed } from "react-icons/io";
import { MdSmokingRooms } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCommentListAction, getTypeDetailAction } from "redux/actions";
import MakeReservation from "../../../components/user/MakeReservation";
import CollapseInfo from "./components/CollapseInfo";
import SliderRoomDetail from "./components/SliderRoomDetail";
import "./RoomDetailPage.scss";
//
const renderItemService = (service) => {
  switch (Object.keys(service)[0]) {
    case "wifi": {
      return (
        <div className="card-room__services-item">
          <span>
            <i className="fa fa-wifi"></i>
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "bed": {
      return (
        <div className="card-room__services-item">
          <span>
            <IoIosBed />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "roomSize": {
      return (
        <div className="card-room__services-item">
          <span>
            <GoHome />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "view": {
      return (
        <div className="card-room__services-item">
          <span>
            <i className="fa fa-columns"></i>
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "smoking": {
      return (
        <div className="card-room__services-item">
          <span>
            <MdSmokingRooms />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "shower": {
      return (
        <div className="card-room__services-item">
          <span>
            <FaShower />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    default:
      <div className="card-room__services-item">
        <span>
          <i className="fa fa-check"></i>
        </span>
        <p>{service[Object.keys(service)[0]]}</p>
      </div>;
  }
};
function RoomDetailPage(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const roomId = params.id;
  useEffect(() => {
    dispatch(getTypeDetailAction({ id: roomId }));
    dispatch(getCommentListAction({ id: roomId, params: {} }));
  }, [dispatch,roomId]);
  const RoomDetail = useSelector((state) => state.typeReducer.typeDetail);

  const { t } = useTranslation();


  return (
    <div className="room-detail">
      <div className="room-detail__banner">
        <div className="rooms-page__banner-content">
          <div className="line-1">
            <img src={IMAGES.LINE1} alt="" />
          </div>
          <div className="heading">{t(`${RoomDetail.data.name}`)}</div>
          <div className="line-1">
            <img src={IMAGES.LINE2} alt="" />
          </div>
        </div>
      </div>

      <div className="room-detail__body">
        <div className="room-detail__reservation">
          <MakeReservation />
        </div>

        <div className="container">
          <div className="room-detail__left">
            <div className="room-detail__slider">
              <SliderRoomDetail imgList={RoomDetail.data.images} />
            </div>
          </div>
          <div className="room-detail__right">
            <h1>Feature service</h1>
            <div className="card-room__services">
              {RoomDetail.data?.utilities?.map((serviceItem) => renderItemService(serviceItem))}
            </div>
            <h1>Our guests rate this room as below</h1>
            <div className="total__rating">
              <h2>Service</h2>
              <Progress percent={89} status="active" />
              <h2>Room</h2>
              <Progress percent={95} status="active" />
              <h2>Cleanness</h2>
              <Progress percent={90} status="active" />
              <h2>Food</h2>
              <Progress percent={88} status="active" />
              <h2>Total</h2>
              <Progress percent={99} status="active" />
            </div>
          </div>
          <div className="room-detail__same"></div>
        </div>
        <div className="room-detail__bottom">
          <div className="container">
            <div className="room-detail__left">
              <div className="room-detail__info">
                <div className="room-detail__title">
                  <div className="room-detail__name">{t(RoomDetail.data.name)}</div>
                </div>
                <CollapseInfo RoomDetail={RoomDetail.data} />
              </div>
            </div>
            <div className="room-detail__right">
              <h3>OUR GUESTS RATE THIS ROOM AS BELOW</h3>
              <div className="total__rating">
                <h2>Service</h2>
                <Progress percent={50} status="active" />
                <h2>Room</h2>
                <Progress percent={80} status="active" />
                <h2>Cleanness</h2>
                <Progress percent={90} status="active" />
                <h2>Food</h2>
                <Progress percent={100} status="active" />
                <h2>Total</h2>
                <Progress percent={100} status="active" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="room-detail__relate">
        <div className="container">
        <div className="room-detail__relate-title">
          Related Rooms
        </div>
        <div className="line-2">
            <img src={IMAGES.LINE2} alt="" />
          </div>
        </div>
      
      </div> */}
    </div>
  );
}

export default RoomDetailPage;
