import React, { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import { Col, Row } from "antd";
import "./TypeProductPage.css";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  console.log("pro", products);

  const fetchProductType = async (type) => {
    const res = await ProductService.getProductType(type);
    if (res?.status === "OK") {
      setProducts(res?.data);
    } else {
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);
  return (
    <>
      <div style={{ width: "100%", background: "#efefef", height: "100vh" }}>
        <div style={{ width: "1270px", margin: "0 auto" }}>
          <Row className="row-none-flex">
            <Col>
              {!products?.type ? (
                <div className="title-type__product">
                  Danh sách truyện thuộc thể loại:{" "}
                  <span className="type__product">{products[0]?.type}</span>
                </div>
              ) : (
                ""
              )}
              <div className="wrapper-products">
                {products?.map((product) => {
                  return (
                    <CardProduct
                      id={product._id}
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default TypeProductPage;
