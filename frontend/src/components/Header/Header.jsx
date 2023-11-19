import React, { useEffect, useState } from "react";
import { Row, Col, Popover, Badge } from "antd";
import ButtonSearch from "../ButtonSearch/ButtonSearch";
import "./Header.css";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import { searchProduct } from "../../redux/slices/productSlice";

const Header = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleNavigateSignup = () => {
    navigate("/sign-up");
  };

  const handleHome = () => {
    navigate("/");
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
  };

  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");

  const order = useSelector((state) => state.order);

  useEffect(() => {
    setUserName(user?.name);
  }, [user.name]);
  const content = (
    <>
      <p onClick={handleLogout} className="content-p">
        Đăng xuất
      </p>
      <p onClick={() => navigate("/profile-user")} className="content-p">
        Thông tin người dùng
      </p>
      {user?.isAdmin && (
        <p onClick={() => navigate("/system/admin")} className="content-p">
          Quản lí hệ thống
        </p>
      )}
    </>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div>
      <div className="header-top">
        <div className="wrapper">
          <div className="inner">
            <div className="grid">
              <div className="text-network">
                <marquee behavior="scroll" direction="left">
                  "Chào mừng bạn đã đến với Konoha Books. Nếu bạn cần giúp đỡ,
                  hãy liên hệ với chúng tôi qua hotline: (+84) 833 755 199 hoặc
                  email: huynhkhoaa2703@gmail.com"
                </marquee>
              </div>
              <div className="contact-network">
                <div className="contact">
                  <div className="phone-number">
                    <a href="tel:(+84) 833755199">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      (+84) 833 755 199
                    </a>
                  </div>
                  <div className="mail-contact">
                    <a href="mailto:huynhkhoaa2703@gmail.com">
                      <i className="fa fa-envelope " aria-hidden="true"></i>
                      mail: huynhkhoaa2703@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Row className="header-wrapper">
        <Col
          style={{ cursor: "pointer" }}
          onClick={handleHome}
          className="header-text"
          span={6}
        >
          Koha
        </Col>
        {!isHiddenSearch && (
          <Col className="header-text" span={12}>
            <ButtonSearch
              size="large"
              textButton="Tìm kiếm"
              placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
              onChange={onSearch}
            />
          </Col>
        )}

        <Col className="header-text header-text__right" span={6}>
          {user?.access_token ? (
            <div>
              <Popover content={content} trigger="click">
                <span>Xin chào, </span>
                <span>{userName?.length ? userName : user?.email}</span>
              </Popover>
            </div>
          ) : (
            <div className="header-account">
              <UserOutlined className="icon-user" />
              <div
                // onClick={handleNavigateLogin}
                className="header-account__sub"
              >
                <span onClick={handleNavigateLogin}>Đăng nhập</span>
                <br></br>
                <span onClick={handleNavigateSignup}>Đăng ký</span>
                {/* <div className="">
                  <span>Tai khoan</span>
                  <CaretDownOutlined />
                </div> */}
              </div>
            </div>
          )}

          {!isHiddenCart && (
            <>
              <div className="header-cart" onClick={() => navigate("/order")}>
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined className="icon-user" />
                </Badge>
              </div>
              <div className="header-wishlist">
                <HeartOutlined className="icon-user" />
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
