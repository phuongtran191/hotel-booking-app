import { IMAGES } from "constants/images.constants";
import { LIST_ROOM } from "constants/rooms.constant";
import React, { useEffect, useRef, useState } from "react";
import { FaBed, FaFan, FaWifi } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import "./FeatureRoom.scss";
import Slider from "react-slick";

function FeatureRoom(props) {
  const [currentSlider, setCurrentSlider] = useState("0");
  const [activeLoad, setActiveLoad] = useState(true);
  const handleChangeSlider = (value) => {
    setCurrentSlider(value);
  };
  let myRef = useRef();
  const customSlider = useRef();
  const settings = {
    ref: (slider) => (customSlider.current = slider),
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if (activeLoad === false) {
      window.scrollTo({ behavior: "smooth", top: myRef.current.offsetTop});
      
    }
    else{
        setActiveLoad(false);
    }
    customSlider.current.slickGoTo(currentSlider);
  }, [currentSlider]);
  return (
    <div className="feature-room" ref={myRef}>
      <div className="feature-room__left">
        <Slider {...settings}>
          {LIST_ROOM.map((room) => (
            <div className="feature-room__img" key={`feature-room__img${room.id}`}>
              <img src={room.img} alt="" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="feature-room__right">
        <div className="feature-room__title">{LIST_ROOM[currentSlider].name}</div>

        <div className="feature-room__line2">
          <img src={IMAGES.LINE2} alt="" />
        </div>

        <div className="feature-room__price">
          {`$${LIST_ROOM[currentSlider].price}`}

          <span>per night</span>
        </div>
        <p>{LIST_ROOM[currentSlider].description}</p>
        <ul className="feature-room__services">
          <li>
            <span>
              <FaBed />
            </span>
            DOUBLE BED
          </li>
          <li>
            <span>
              <FaWifi />
            </span>
            FREE WIFI
          </li>
          <li>
            <span>
              <RiComputerLine />
            </span>
            CABLE TV
          </li>
          <li>
            <span>
              <FaFan />
            </span>
            AIR CONDITION
          </li>
        </ul>
        <ul className="feature-room__dots">
          <li>
            <input
              type="radio"
              name="dots"
              id="dots-1"
              value="0"
              defaultChecked={currentSlider}
              onChange={(e) => handleChangeSlider(e.target.value)}
            />
            <label htmlFor="dots-1"></label>
          </li>
          <li>
            <input
              type="radio"
              name="dots"
              id="dots-2"
              value="1"
              onChange={(e) => handleChangeSlider(e.target.value)}
            />
            <label htmlFor="dots-2"></label>
          </li>
          <li>
            <input
              type="radio"
              name="dots"
              id="dots-3"
              value="2"
              onChange={(e) => handleChangeSlider(e.target.value)}
            />{" "}
            <label htmlFor="dots-3"></label>
          </li>

          <li>
            <input
              type="radio"
              name="dots"
              id="dots-4"
              value="3"
              onChange={(e) => handleChangeSlider(e.target.value)}
            />
            <label htmlFor="dots-4"></label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FeatureRoom;
