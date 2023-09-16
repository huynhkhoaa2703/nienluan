import React from "react";
import { Button } from "antd";

const ButtonComponent = ({ size, textButton, ...rest }) => {
  return (
    <Button className="btn-search__button" size={size} {...rest}>
      {textButton}
    </Button>
  );
};

export default ButtonComponent;
