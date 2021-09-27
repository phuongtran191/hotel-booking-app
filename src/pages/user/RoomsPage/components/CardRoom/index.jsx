import { Image, notification, Rate } from "antd";
import { ROUTER_URL } from "constants/index";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaShower } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoIosBed } from "react-icons/io";
import { MdSmokingRooms } from "react-icons/md";
import { Link } from "react-router-dom";
import history from "utils/history";
import "./CardRoom.scss";
const formatDate = "YYYY/MM/DD";
const renderItemService = (service, index) => {
  switch (Object.keys(service)[0]) {
    case "wifi": {
      return (
        <div className="card-room__services-item" key={`card-room__services-item-${index}`}>
          <span>
            <i className="fa fa-wifi"></i>
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "bed": {
      return (
        <div className="card-room__services-item" key={`card-room__services-item-${index}`}>
          <span>
            <IoIosBed />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "roomSize": {
      return (
        <div className="card-room__services-item" key={`card-room__services-item-${index}`}>
          <span>
            <GoHome />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "view": {
      return (
        <div className="card-room__services-item" key={`card-room__services-item-${index}`}>
          <span>
            <i className="fa fa-columns"></i>
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "smoking": {
      return (
        <div className="card-room__services-item" key={`card-room__services-item-${index}`}>
          <span>
            <MdSmokingRooms />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    case "shower": {
      return (
        <div className="card-room__services-item" key={`card-room__services-item-${index}`}>
          <span>
            <FaShower />
          </span>
          <p>{service[Object.keys(service)[0]]}</p>
        </div>
      );
    }
    default:
      <div className="card-room__services-item" key={`card-room__services-item-${index}`}>
        <span>
          <i className="fa fa-check"></i>
        </span>
        <p>{service[Object.keys(service)[0]]}</p>
      </div>;
  }
};
function CardRoom(props) {
  const { listVariable, typeRoom, isVariable, setIsFocus } = props;
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const off = 40;
  const dataCheckVariable = JSON.parse(sessionStorage.getItem("checkVariable")) || undefined;

  const handleBooking = () => {
    if ((dataCheckVariable !== undefined) && (Object.keys(listVariable.data).length!== 0)) {
      setIsFocus(false);
      const Nights = moment(dataCheckVariable.date[1], formatDate).diff(
        moment(dataCheckVariable.date[0], formatDate),
        "days"
      );
      const DateIn = moment(dataCheckVariable.date[0]).format("dddd");
      const DateOut = moment(dataCheckVariable.date[1]).format("dddd");
      const RoomId = listVariable.data[typeRoom.id][0];

      sessionStorage.setItem(
        "bookingInfo",

        JSON.stringify({
          ...dataCheckVariable,
          typeRoom: typeRoom.name,
          price: typeRoom.price,
          images: typeRoom.images,
          numberNight: Nights,
          dateIn: DateIn,
          dateOut: DateOut,
          roomId: RoomId,
          typeRoomId: typeRoom.id,
        })
      );
      history.push(ROUTER_URL.BOOKING);
    } else {
      notification.info({ description: "you have not selected a date !" });
      setIsFocus(true);
    }
  };
  return (
    <div className="card-room" data-aos="fade-up">
      {off && (
        <div className="wrap wrap-green">
          <span className="ribbon">off {off}%</span>
        </div>
      )}
      <div className="card-room__img">
        <Image
          className="img-large"
          preview={{ visible: false }}
          width={"100%"}
          height={"12rem"}
          src={typeRoom.images[0]}
          onClick={() => setVisible(true)}
        />
        <div className="card-room__thumb">
          <div className="card-room__thumb-item">
            <Image
              className="img-small"
              preview={{ visible: false }}
              width={"100%"}
              height={"6rem"}
              src={typeRoom.images[1]}
              onClick={() => setVisible(true)}
            />
          </div>
          <div className="card-room__thumb-item">
            <Image
              className="img-small"
              preview={{ visible: false }}
              width={"100%"}
              height={"6rem"}
              src={typeRoom.images[2]}
              onClick={() => setVisible(true)}
            />
          </div>
        </div>

        <div style={{ display: "none" }}>
          <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
            {typeRoom.images.map((image, index) => (
              <Image src={image} key={`card-room__slider${index}`} />
            ))}
          </Image.PreviewGroup>
        </div>
      </div>
      <div className="card-room__content">
        <Link to={`${ROUTER_URL.ROOMS}/${typeRoom.id}`}>
          <div className="card-room__name">{t(typeRoom.name)}</div>
        </Link>
        <div className="card-room__rate">
          <Rate disabled allowHalf defaultValue={typeRoom.rating} className="rate" />
          {/* <div className="map">
            <span>
              <FaMapMarkerAlt />
            </span>
            <p>{typeRoom.map}</p>
          </div> */}
        </div>
        <p className="card-room__description">{typeRoom.description}</p>
        <div className="card-room__services">
          {typeRoom.utilities.map((serviceItem, index) => renderItemService(serviceItem, index))}
        </div>

        <div className="card-room__choice">
          <div className="card-room__price">
            <small>{t(`$${(typeRoom.price / off) * 100} / Night `)}</small>{" "}
            <span>{t(`$${typeRoom.price} / Night`)}</span>{" "}
          </div>
          <div className="card-room__btn">
            <button
              onClick={() => handleBooking()}
              className={!isVariable ? "btn-disabled" : ""}
              disabled={!isVariable}
            >
              Booking Now
            </button>
          </div>
        </div>
      </div>
      {!isVariable && <div className={"card-room__status"}>Fullybooked</div>}
    </div>
  );
}

export default CardRoom;
