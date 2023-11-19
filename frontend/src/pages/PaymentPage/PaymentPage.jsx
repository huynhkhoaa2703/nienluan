import { Checkbox, Form, InputNumber, Radio } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import {
  DeleteOutlined,
  DownOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { convertPrice } from "../../utils";
import { updateUser } from "../../redux/slices/userSlice";
// import StepComponent from "../../components/StepConponent/StepComponent";
import { useDispatch, useSelector } from "react-redux";
import "./PaymentPage.css";
import * as message from "../../components/Message/Message";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
} from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  console.log("state", stateUserDetails);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const { data } = mutationUpdate;
  const { data: dataOrder, isSuccess, isError } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess && dataOrder?.status === "OK") {
      const listOrder = [];
      order?.orderItems?.forEach((item) => {
        listOrder.push(item.product);
      });
      dispatch(removeAllOrderProduct({ idProduct: listOrder }));
      message.success("Đặt hàng thành công");
      navigate("/order-success", {
        state: {
          delivery,
          payment,
          orders: order?.orderItems,
          totalPriceMemo: totalPriceMemo,
        },
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 300000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, diliveryPriceMemo]);

  const handleDelivery = (e) => {
    const value = e.target.value;
    setDelivery(value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItems &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      user?.id &&
      priceMemo
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItems,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
    console.log("userid3:", user?.id);
  };

  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ fontWeight: "bold" }}>Phương thức thanh toán</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="wrapper-left">
            <div className="wrapper-info">
              <div>
                <span className="label-payment">
                  Chọn phương thức giao hàng
                </span>
                <div className="wrapper-radio">
                  <Radio
                    value="fast"
                    checked={delivery === "fast"}
                    onChange={(e) => handleDelivery(e)}
                  >
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      FAST
                    </span>{" "}
                    Giao hàng tiết kiệm
                  </Radio>
                  <Radio
                    value="gojek"
                    checked={delivery === "gojek"}
                    onChange={(e) => handleDelivery(e)}
                  >
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      GO_JEK
                    </span>{" "}
                    Giao hàng tiết kiệm
                  </Radio>
                </div>
              </div>
            </div>
            <div>
              <div className="wrapper-info">
                <div>
                  <span className="label-payment">
                    Chọn phương thức thanh toán
                  </span>
                  <div
                    className="wrapper-radio"
                    onChange={handlePayment}
                    value={payment}
                  >
                    <Radio value="later_money">
                      {" "}
                      Thanh toán tiền mặt khi nhận hàng
                    </Radio>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-right">
            <div style={{ width: "100%" }}>
              <div className="wrapper-info">
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${user?.address} ${user?.city}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: "#9255FD", cursor: "pointer" }}
                  >
                    Thay đổi
                  </span>
                </div>
              </div>
              <div className="wrapper-info">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(diliveryPriceMemo)}
                  </span>
                </div>
              </div>
              <div className="wrapper-total">
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </div>
            </div>
            <ButtonComponent
              className="btn-order"
              onClick={() => handleAddOrder()}
              size={40}
              textButton={"Đặt hàng"}
            ></ButtonComponent>
          </div>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          // onFinish={onUpdateUser}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <InputComponent
              value={stateUserDetails["name"]}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <InputComponent
              value={stateUserDetails["city"]}
              onChange={handleOnchangeDetails}
              name="city"
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Adress"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <InputComponent
              value={stateUserDetails.address}
              onChange={handleOnchangeDetails}
              name="address"
            />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default PaymentPage;
