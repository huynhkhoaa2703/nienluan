import React from "react";
import { Input } from "antd";

const InputComponent = ({ size, placeholder, ...rest }) => {
  return (
    <Input
      className="btn-search__input"
      size={size}
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
