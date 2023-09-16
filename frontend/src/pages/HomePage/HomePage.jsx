import React from "react";
import TypeProducts from "../../components/TypeProducts/TypeProducts";
import "./HomePage.css";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/img/banner1.jpg";
import slider2 from "../../assets/img/banner2.jpg";
import CardProduct from "../../components/CardProduct/CardProduct";

const HomePage = () => {
  const arr = ["Manga", "Manhua", "Manhwa"];
  return (
    <>
      <div className="type-product">
        <div className="type-product_wrapper">
          {arr.map((item) => {
            return <TypeProducts name={item} key={item} />;
          })}
        </div>
      </div>
      <div id="container">
        <SliderComponent className="img-wrapper" arrImg={[slider1, slider2]} />
        <div className="card-wrapper">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </>
  );
};

export default HomePage;
