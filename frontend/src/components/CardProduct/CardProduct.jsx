import React from "react";
import { Card } from "antd";
import "./CardProduct.css";
import { useNavigate } from "react-router-dom";

const CardProduct = (props) => {
  const { countInStock, description, image, name, type, price, selled, id } =
    props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <div>
      <Card
        onClick={() => handleDetailsProduct(id)}
        hoverable
        className="card-item"
        style={{ width: 240 }}
        cover={<img alt="avatar-img" src={image} />}
      >
        <div className="card-name">{name}</div>
        <div className="card-price">{price?.toLocaleString() + "đ"}</div>
        <div className="card-selled">
          <span> Da ban</span>
          <span>{selled || 2710}</span>
        </div>
      </Card>
    </div>
  );
};

export default CardProduct;
