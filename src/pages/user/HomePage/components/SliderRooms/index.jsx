import { LIST_ROOM } from "constants/rooms.constant";
import React, { useRef, useState } from "react";
import "./SliderRooms.scss";
import Slider from "react-slick";
function SliderRooms(props) {
  const customSlider = useRef();
  const [ImageIndex, setImageIndex] = useState(0);
  const settings = {
    ref: (slider) => (customSlider.current = slider),
    dots: null,
    infinite: true,
    centerMode:true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current, next) => setImageIndex(next),
  };
console.log(ImageIndex)
  return (
    <div className="slider-rooms">
      <Slider {...settings}>
        {LIST_ROOM.map((room,index) => (
        <div className={ImageIndex===index?"slider-rooms__item slider-room__active":"slider-rooms__item"} key={`slider-rooms-${room.id}`}>
              <img src={room.img} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderRooms;
