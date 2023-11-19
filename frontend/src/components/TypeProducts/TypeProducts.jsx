import React from "react";
import { useNavigate } from "react-router-dom";
import "./TypeProducts.css";

const TypeProducts = ({ name }) => {
  const navigate = useNavigate();
  const handleType = (type) => {
    navigate(`/product/${type}`, { state: type });
  };

  return (
    <div className="type-product__hover" onClick={() => handleType(name)}>
      {name}
    </div>
  );
};

export default TypeProducts;
