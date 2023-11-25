import { Col, Image, InputNumber, Row } from "antd";
import React, { useState } from "react";
import imgProduct from "../../assets/img/naruto72big.jpg";
import imgProductSub from "../../assets/img/naruto72.jpg";
import "./ProductDetailsComponent.css";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "./../../components/ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slices/orderSlice";

const ProductDetailsComponent = ({ idProduct }) => {
  const [quantityProduct, setQuantityProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setQuantityProduct(Number(value));
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };
  const { data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    { enabled: !!idProduct }
  );

  const handleCount = (type) => {
    if (type === "plus") {
      setQuantityProduct(quantityProduct + 1);
    } else {
      setQuantityProduct(quantityProduct - 1);
    }
  };

  const handleOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: quantityProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };

  const handleWishlist = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: quantityProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };
  return (
    <>
      <Row className="row-res-product">
        <Col className="col-flex" span={10}>
          <Image src={productDetails?.image} alt="img" preview={false} />
          <div className="img-sub">
            <Image
              src={productDetails?.image}
              alt="img"
              style={{ width: "100%" }}
            />
            <Image
              src={productDetails?.image}
              alt="img"
              style={{ width: "100%" }}
            />
            <Image
              src={productDetails?.image}
              alt="img"
              style={{ width: "100%" }}
            />
          </div>
        </Col>
        <Col span={14} className="col-right">
          <h2 className="name-product">{productDetails?.name}</h2>
          <div style={{ marginBottom: "10px" }}>
            <span className="author-frame">Tác giả: </span>
            <span className="author-name">{productDetails?.author}</span>
          </div>
          <div>
            <span className="author-frame">Thể loại: </span>
            <span className="type-name">{productDetails?.type}</span>
          </div>
          <div>
            <StarFilled className="vote-star" />
            <StarFilled className="vote-star" />
            <StarFilled className="vote-star" />
            <StarFilled className="vote-star" />
            <StarFilled className="vote-star" />
            <span className="text-sell">
              {" "}
              | Đã bán: {productDetails?.selled}
            </span>
          </div>
          <div className="price-product">
            <h1 className="price-product__text">
              {productDetails?.price.toLocaleString() + "đ"}
            </h1>
          </div>
          <div className="address-product">
            <span>Giao tới: </span>
            <span className="address-product__span">{user?.address}</span>
            <span className="address-product__change">Thay đổi địa chỉ</span>
          </div>
          <div className="quality-product">
            <div>Số lượng</div>
            <div>
              <button className="btn-click" onClick={() => handleCount("min")}>
                <MinusOutlined className="min-product" />
              </button>
              <InputNumber
                min={1}
                max={99999}
                defaultValue={1}
                onChange={onChange}
                size="small"
                value={quantityProduct}
              />
              <button className="btn-click" onClick={() => handleCount("plus")}>
                <PlusOutlined className="plus-product" />
              </button>
            </div>
          </div>
          <div class="btn-flex">
            <ButtonComponent
              className="btn-add"
              textButton={"Chọn mua"}
              onClick={handleOrder}
            ></ButtonComponent>
            <ButtonComponent
              className="btn-favorite"
              textButton={"Thêm vào yêu thích"}
              onClick={handleWishlist}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailsComponent;
