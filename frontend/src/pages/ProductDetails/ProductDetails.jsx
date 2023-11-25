import React from "react";
import ProductDetailsComponent from "../ProductDetailsComponent/ProductDetailsComponent";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";

const ProductDetails = ({ idProduct }) => {
  const { id } = useParams();

  return (
    <div className="product-detail__header">
      <div className="product-detail__title">Chi tiết sản phẩm</div>
      <div className="product-detail">
        <ProductDetailsComponent className="product-res" idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
