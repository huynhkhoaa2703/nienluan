import React from "react";
import { Card } from "antd";
import "./CardProduct.css";

const CardProduct = () => {
  return (
    <div>
      <Card
        hoverable
        bordered={false}
        className="card-item"
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://product.hstatic.net/200000343865/product/26_497075fbb8bf4197b06fdd9c714847de_master.jpg"
          />
        }
      >
        <div className="card-name">Naruto</div>
        <div className="card-price">22.000</div>
      </Card>
    </div>
  );
};

export default CardProduct;
