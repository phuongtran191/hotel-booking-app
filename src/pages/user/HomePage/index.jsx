import { BackTop } from "antd";
import About1 from "assets/images/about1.webp";
import About2 from "assets/images/about2.webp";
import LoadVideo from "assets/images/load.png";
import PillowImg from "assets/images/pillow.png";
import SpecialImg from "assets/images/special.png";
import { IMAGES } from "constants/images.constants";
import { ListBlog, ListFeedBack, ListService } from "constants/index";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaAngleDoubleUp } from "react-icons/fa";
import { RiStarFill } from "react-icons/ri";
import Slider from "react-slick";
import CardAbout from "./components/CardAbout";
import CardBlog from "./components/CardBlog";
import CardFeedBack from "./components/CardFeedBack";
import CardService from "./components/CardService";
import FeatureRoom from "./components/FeatureRoom";
import MakeReservation from "../../../components/user/MakeReservation";
import SliderRooms from "./components/SliderRooms";
import "./HomePage.scss";



function HomePage(props) {
  const { t } = useTranslation();
  const customSlider = useRef();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,

    slidesToShow: 3,
    speed: 1000,
    autoplay: true,
    slidesToScroll: 2,
  };
  const settings1 = {
    ref: (slider) => (customSlider.current = slider),
    infinite: true,
    slidesToShow: 3,
    speed: 1000,
    autoplay: true,
    slidesToScroll: 2,
  };
  return (
    <div className="home">
      <div className="banner">
        <div
          className="banner__line-top"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="1000"
        >
          <img src={IMAGES.LINE1} alt="" />
        </div>
        <h3
          className="banner__content"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="1500"
        >
          {t("Royal Luxury Hotel")}
        </h3>
        <h2
          className="banner__title"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="1800"
        >
          {t("Most Relaxing Place")}
        </h2>
        <div
          className="banner__line-bottom"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="2000"
        >
          <img src={IMAGES.LINE2} alt="" />
        </div>
        <div className="banner__btn">
          <button
            className="btn btn-order"
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            {t("Take a tour")}
          </button>
          <button
            className="btn btn-readmore"
            data-aos="fade-left"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
          >
            {t("Read more")}
          </button>
        </div>
        <div className="reservation-check">
          <MakeReservation />
        </div>
      </div>
      <div className="about-us">
        <div className="container">
          <div className="about-us__left">
            <div
              className="about-us__left-item"
              data-aos="zoom-in-up"
              data-aos-easing="linear"
              data-aos-delay="500"
              data-aos-offset="100"
              data-aos-duration="500"
            >
              <CardAbout
                img={PillowImg}
                title={"Cozy Room"}
                content={`Far far away, behind the word mountains, far from the countries Vokalia.`}
              />
              <div className="about-us__left-img">
                <img src={About1} alt="" />
              </div>
            </div>
            <div
              className="about-us__left-item"
              data-aos="zoom-in-down"
              data-aos-easing="linear"
              data-aos-delay="100"
              data-aos-offset="100"
              data-aos-duration="1000"
            >
              <div className="about-us__left-img">
                <img src={About2} alt="" />
              </div>

              <CardAbout
                img={SpecialImg}
                title={"Special Offers"}
                content={`Far far away, behind the word mountains, far from the countries Vokalia.`}
              />
            </div>
          </div>
          <div
            className="about-us__right"
            data-aos="fade-up-left"
            data-aos-easing="linear"
            data-aos-delay="500"
            data-aos-offset="100"
            data-aos-duration="600"
          >
            <div className="home__title">
              <div>
                <img src={IMAGES.LINE1} alt="" />
              </div>
              {t("about us")}
            </div>
            <div className="home__heading">{t("Royal Hotel Booking Agency")}</div>
            <p className="about-us__content">{t("about us content")}</p>
            <button className="about-us__btn">{t("Book your room now")}</button>
          </div>
        </div>
        <div className="about-us__discover">
          <div className="container">
            <div className="discover__content">
              <div className="discover__stars" data-aos="fade-up" data-aos-duration="1200">
                <img src={IMAGES.STARS} alt="" />
              </div>
              <h5 data-aos="fade-up" data-aos-duration="1000">
                Discover what makes us a five star hotel
              </h5>
              <h3 data-aos="fade-up" data-aos-duration="1000">
                About the Hotel
              </h3>
              <div className="discover__line2 " data-aos="fade-up" data-aos-duration="1600">
                <img src={IMAGES.LINE2} alt="" />
              </div>
              <p data-aos="fade-right" data-aos-duration="1000">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam et voluptatibus
                assumenda magnam esse dolore quam. Voluptate, quae pariatur maxime expedita debitis
                recusandae culpa neque consequatur minus quis aliquam vero.
              </p>
              <p data-aos="fade-right" data-aos-duration="1000">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae!
              </p>
              <div className="discover__list">
                <ul className=" discover__list-left">
                  <li data-aos="fade-left" data-aos-duration="100">
                    <span>
                      <RiStarFill />
                    </span>
                    90 Luxury Rooms
                  </li>
                  <li data-aos="fade-left" data-aos-duration="300">
                    <span>
                      <RiStarFill />
                    </span>
                    120 Family Rooms
                  </li>
                  <li data-aos="fade-left" data-aos-duration="900">
                    <span>
                      <RiStarFill />
                    </span>
                    340 Standard Rooms
                  </li>
                  <li data-aos="fade-left" data-aos-duration="1200">
                    <span>
                      <RiStarFill />
                    </span>
                    10 Restaurants and Bars
                  </li>
                  <li data-aos="fade-left" data-aos-duration="1500">
                    <span>
                      <RiStarFill />
                    </span>
                    2 Parking Spaces
                  </li>
                </ul>
                <ul className="discover__list-right">
                  <li data-aos="fade-left" data-aos-duration="300">
                    <span>
                      <RiStarFill />
                    </span>
                    1 Spa Center
                  </li>
                  <li data-aos="fade-left" data-aos-duration="600">
                    <span>
                      <RiStarFill />
                    </span>
                    4 Fitness Halls
                  </li>
                  <li data-aos="fade-left" data-aos-duration="900">
                    <span>
                      <RiStarFill />
                    </span>
                    3 Conference Halls
                  </li>
                  <li data-aos="fade-left" data-aos-duration="1200">
                    <span>
                      <RiStarFill />
                    </span>
                    5 Swimming Pools
                  </li>
                  <li data-aos="fade-left" data-aos-duration="1500">
                    <span>
                      <RiStarFill />
                    </span>
                    1 Beauty Center
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services">
        <div className="container">
          <div
            className="home__title"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-delay="500"
            data-aos-offset="100"
            data-aos-duration="600"
          >
            <div>
              <img src={IMAGES.LINE1} alt="" />
            </div>

            {t("ROYAL SERVICES")}
          </div>
          <div
            className="home__heading"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-delay="500"
            data-aos-offset="100"
            data-aos-duration="600"
          >
            {t("Explore Our Hotel Services")}
          </div>
          <div
            className="services__list"
            data-aos="flip-left"
            data-aos-easing="linear"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            <ul>
              {ListService.map((item) => (
                <li data-aos="fade-right" key={`service__item-${item.id}`}>
                  <CardService {...item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rooms">
        <div
          className="home__title"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-delay="500"
          data-aos-offset="100"
          data-aos-duration="500"
        >
          <div>
            <img src={IMAGES.LINE1} alt="" />
          </div>
          {t("OUR ROOMS")}
        </div>
        <div
          className="home__heading"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-delay="500"
          data-aos-offset="100"
          data-aos-duration="500"
        >
          {t("Featured Rooms")}
        </div>
        <FeatureRoom />
        {/* list room slide */}
        <div className="container">
          <div
            className="home__title"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="500"
            data-aos-offset="100"
            data-aos-duration="500"
          >
            <div>
              <img src={IMAGES.LINE1} alt="" />
            </div>
            {t("OUR ROOMS")}
          </div>
          <div
            className="home__heading"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="500"
            data-aos-offset="100"
            data-aos-duration="500"
          >
            {t("Favorite Rooms")}
          </div>
          <div className="rooms__list">
            <SliderRooms />
          </div>
        </div>
      </div>
      <div className="show-video">
        <div className="show-video__content">
          <h4 className="show-video__title">{t("WATCH OUR LUXURIOUS HOTEL")}</h4>
          <h3 className="show-video__heading">{t("Take A Tour")}</h3>
          <div className="show-video__load">
            <img src={LoadVideo} alt="" className="load" />
          </div>
        </div>
      </div>
      <div className="testimonial">
        <div className="container">
          <div
            className="home__title"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="500"
            data-aos-offset="100"
            data-aos-duration="500"
          >
            <div>
              <img src={IMAGES.LINE1} alt="" />
            </div>
            {t("TESTIMONIALS")}
          </div>
          <div
            className="home__heading"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="500"
            data-aos-offset="100"
            data-aos-duration="500"
          >
            {t("Happy Guests")}
          </div>
          <div className="testimonial__list">
            <Slider {...settings}>
              {ListFeedBack.map((user) => (
                <CardFeedBack {...user} key={`testimonial__item-${user.id}`} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="news">
        <div className="container">
          <div className="news__title">
            <div className="news__title-left">
              <div
                className="home__title"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-delay="500"
                data-aos-offset="100"
                data-aos-duration="500"
              >
                <div>
                  <img src={IMAGES.LINE1} alt="" />
                </div>
                {t("BLOG")}
              </div>
              <div
                className="home__heading"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-delay="500"
                data-aos-offset="100"
                data-aos-duration="500"
              >
                {t("News Feeds")}
              </div>
            </div>
            <div className="news__title-right">
              <div className="news__title-btn">
                <button onClick={() => customSlider.current.slickPrev()} className="btn btn-prev ">
                  <AiOutlineArrowLeft />
                </button>
                <button onClick={() => customSlider.current.slickNext()} className="btn btn-next">
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="news__list">
            <Slider {...settings1}>
              {ListBlog.map((news) => (
                <CardBlog {...news} key={`news__item-${news.id}`} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <BackTop>
        <div className="up-top">
          <FaAngleDoubleUp />
        </div>
      </BackTop>
    </div>
  );
}

export default HomePage;
