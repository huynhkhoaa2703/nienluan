import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./ButtonSearch.css";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonSearch = (props) => {
  const { size, placeholder, textButton } = props;
  return (
    <div className="btn-search">
      <InputComponent
        className="btn-search__input"
        size={size}
        placeholder={placeholder}
      />
      <ButtonComponent
        className="btn-search__button"
        size={size}
        icon={<SearchOutlined />}
        textButton={textButton}
      ></ButtonComponent>
    </div>
  );
};

export default ButtonSearch;
