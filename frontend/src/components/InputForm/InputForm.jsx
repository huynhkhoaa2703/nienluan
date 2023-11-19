import Input from "antd/es/input/Input";
import React from "react";

const InputForm = (props) => {
  // const [valueInput, setValueInput] = useState("");
  const { placeholder = "text", ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <Input
      placeholder={placeholder}
      value={props.value}
      {...rests}
      onChange={handleOnChangeInput}
    />
  );
};

export default InputForm;
