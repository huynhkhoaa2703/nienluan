import React, { useEffect, useState } from "react";
import "./SignInPage.css";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isSuccess } = mutation;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);

    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
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
          {data?.status === "Error" && (
            <span style={{ color: "rgb(206, 36, 36)", display: "block" }}>
              {data?.message}
            </span>
          )}
          {/* <Loading isLoading={isLoading}> */}
          <ButtonComponent
            onClick={handleSignIn}
            disabled={!email.length || !password.length}
            className="btn-form"
            textButton={"Đăng nhập"}
          ></ButtonComponent>
          {/* </Loading> */}
          <p className="text">Quên mật khẩu?</p>
          <p>
            Chưa có tài khoản?
            <span className="text" onClick={handleNavigateSignUp}>
              Đăng ký
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

export default SignInPage;
