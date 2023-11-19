import React, { useState } from "react";
import { getItem } from "../../utils";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "./AdminPage.css";
import Header from "../../components/Header/Header";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <Header isHiddenSearch isHiddenCart />
      <div className="wrapper-admin">
        <div className="wrapper-admin__left">
          <Menu
            className="menu-sidebar"
            mode="inline"
            style={{
              width: 256,
            }}
            items={items}
            onClick={handleOnClick}
          />
        </div>
        <div className="wrapper-admin__right" style={{ padding: "10px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
