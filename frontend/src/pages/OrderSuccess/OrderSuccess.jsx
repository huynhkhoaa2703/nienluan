import React, { useEffect, useState } from "react";
import "./OrderSuccess.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ fontWeight: "bold" }}>Đơn đặt hàng thành công</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="wrapper-left">
            <div className="wrapper-info">
              <div>
                <span className="label-payment">Phương thức giao hàng</span>
                <div className="wrapper-value">
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderContant.delivery[state?.delivery]}
                  </span>{" "}
                  Giao hàng tiết kiệm
                </div>
              </div>
            </div>
            <div>
              <div className="wrapper-info">
                <div>
                  <span className="label-payment">Phương thức thanh toán</span>
                  <div className="wrapper-value">
                    {orderContant.payment[state?.payment]}
                  </div>
                </div>
              </div>
              <div className="wrapper-info">
                {state.orders?.map((order) => {
                  return (
                    <div className="wrapper-item__order">
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order.image}
                          style={{
                            width: "80px",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "16px", color: "#242424" }}>
                            Giá tiền: {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span
                          style={{
                            color: "rgb(255, 66, 78)",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          Số lượng: {order?.amount}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <span className="total-price__order">
                  Tổng tiền: {convertPrice(state?.totalPriceMemo)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
