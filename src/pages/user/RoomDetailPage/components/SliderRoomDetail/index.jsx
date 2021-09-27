import { Image } from "antd";
import React, { useRef, useState } from "react";
import { IoMdCamera } from "react-icons/io";
import Slider from "react-slick";
import "./SliderRoomDetail.scss";

function SliderRoomDetail(props) {
  const [visible, setVisible] = useState(false);
  const { imgList } = props;
  const [indexSlider,setIndex] = useState(0)
  const customSlider = useRef();
  const settings = {
    ref: (slider) => (customSlider.current = slider),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    // afterChange: () =>
    //     this.setState(state => ({ updateCount: state.updateCount + 1 })),
    //   beforeChange: (current, next) => this.setState({ slideIndex: next })
  };
  console.log("🚀 ~ file: index.jsx ~ line 60 ~ SliderRoomDetail ~ customSlider.current.slideIndex()", customSlider.current)
  const handleChangeSlider=(index)=>
  {
    customSlider.current.slickGoTo(index);
    // value={this.state.slideIndex}
    setIndex(index);
  }
  return (
    <div className="slider-show">
      <div className="slider-show__slick">
        <Slider {...settings}>
          {imgList.map((img, index) => (
            <div className="slider-show__img" key={`slider-show__img-${index}`}>
              <img src={img} alt="" />
            </div>
          ))}
        </Slider>
        <div className="slider-show__icon" onClick={()=>setVisible(true)}>
          <span>
            <IoMdCamera />
          </span>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
        {imgList.map((img, index) => (
            <div className="slider-show__image" key={`slider-show__image-${index}`}>
              <Image src={img}></Image>
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
      <div className="slider-show__thumb">
        {imgList.map((img, index) => (
          <div className={indexSlider===index? "slider-show__thumb-item slider-show__thumb-active":"slider-show__thumb-item"} key={`slider-show__img-${index}`} onClick={()=>handleChangeSlider(index)} >
           
            <img src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderRoomDetail;
