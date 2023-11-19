import React, { useEffect, useState } from "react";
import "./SignUpPage.css";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.signupUser(data));

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      // handleToast();
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
    console.log("user", email, password, confirmPassword);
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  return (
    <div className="container">
      <div className="container-wrapper">
        <div className="container-left">
          <h2>Xin chào,</h2>
          <InputForm
            className="input-component"
            placeholder="user@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <InputForm
            className="input-component"
            placeholder="Nhập mật khẩu"
            type="password"
            value={password}
            onChange={handleOnChangePassword}
          />
          <InputForm
            className="input-component"
            placeholder="Xác nhận mật khẩu"
            type="password"
            value={confirmPassword}
            onChange={handleOnChangeConfirmPassword}
          />
          {data?.status === "Error" && <span>{data?.message}</span>}
          <ButtonComponent
            disabled={
              !email.length || !password.length || !confirmPassword.length
            }
            onClick={handleSignUp}
            className="btn-form"
            textButton={"Đăng ký"}
          ></ButtonComponent>
          <p>
            Bạn đã có tài khoản?
            <span className="text" onClick={handleNavigateSignIn}>
              Đăng nhập
            </span>
          </p>
        </div>
        <div className="container-right">
          <Image
            src="https://img.freepik.com/free-vector/education-logo-vector-design_474888-2129.jpg"
            preview={false}
            alt="img-logo"
          />
          <h3>Mua sách tại Koha Books</h3>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
