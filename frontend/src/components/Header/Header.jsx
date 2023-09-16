import React from "react";
import { Row, Col } from "antd";
import ButtonSearch from "../ButtonSearch/ButtonSearch";
import "./Header.css";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <div>
      <Row className="header-wrapper">
        <Col className="header-text" span={6}>
          Koha
        </Col>
        <Col className="header-text" span={12}>
          <ButtonSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
          />
        </Col>
        <Col className="header-text header-text__right" span={6}>
          <div className="header-account">
            <UserOutlined className="icon-user" />
            <div className="header-account__sub">
              <span>Dang nhap/Dang ky</span>
              <div className="">
                <span>Tai khoan</span>
                <CaretDownOutlined />
              </div>
            </div>
          </div>
          <div className="header-cart">
            <ShoppingCartOutlined className="icon-user" />
            <span>Giỏ hàng</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
