import React, { useEffect, useRef, useState } from "react";
import TypeProducts from "../../components/TypeProducts/TypeProducts";
import "./HomePage.css";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/img/banner1.jpg";
import slider2 from "../../assets/img/banner2.jpg";
import slider3 from "../../assets/img/banner3.jpg";
import CardProduct from "../../components/CardProduct/CardProduct";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [limit, setLimit] = useState(7);
  const [typeProduct, setTypeProduct] = useState([]);
  // const arr = ["Manga", "Manhua", "Manhwa"];

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const { data: products, isPreviousData } = useQuery(
    ["products", limit, searchDebounce],
    fetchProductAll,
    {
      retry: 3,
      retryDelay: 1000,
      keepPreviousData: true,
    }
  );
  // console.log("data", data);

  return (
    <>
      <div className="type-product">
        <div className="type-product_wrapper">
          {typeProduct.map((item) => {
            return <TypeProducts name={item} key={item} />;
          })}
        </div>
      </div>
      <div id="container">
        <SliderComponent
          className="img-wrapper"
          arrImg={[slider1, slider2, slider3]}
        />
        <h1 className="h1-tittle">Truyện mới phát hành</h1>
        <div className="card-wrapper">
          {products?.data ? (
            products?.data?.map((product) => {
              return (
                <>
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
                </>
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>Không tìm thấy sản phẩm này</h1>
          )}
          <div className="btn-frame">
            <ButtonComponent
              className="btn-more btn-margin"
              textButton={isPreviousData ? "Loading..." : "Xem thêm sản phẩm"}
              type="outline"
              onClick={() => setLimit((prev) => prev + { limit })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
