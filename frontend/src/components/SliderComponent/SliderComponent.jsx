import Slider from "react-slick";
import React from "react";
import { Image } from "antd";

const SliderComponent = ({ arrImg }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      {arrImg.map((img) => {
        return <Image key={img} src={img} alt="slider" preview={false} />;
      })}
    </Slider>
  );
};

export default SliderComponent;
