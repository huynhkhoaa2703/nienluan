import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlice";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { data, isSuccess, isError } = mutation;
  console.log("data", data);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      access_token: user?.access_token,
    });
  };

  return (
    <div className="wrapper-profile">
      <h2 className="wrapper-header">Thông tin người dùng</h2>
      <div className="wrapper-content__profile">
        <div className="wrapper-input">
          <span className="warpper-label" htmlFor="name">
            Tên
          </span>
          <InputForm id="name" value={name} onChange={handleOnChangeName} />
          <ButtonComponent
            onClick={handleUpdate}
            className=""
            textButton={"Cập nhật"}
          ></ButtonComponent>
        </div>
        <div className="wrapper-input">
          <span className="warpper-label" htmlFor="Email">
            Email
          </span>
          <InputForm id="email" value={email} onChange={handleOnChangeEmail} />
          <ButtonComponent
            onClick={handleUpdate}
            className=""
            textButton={"Cập nhật"}
          ></ButtonComponent>
        </div>
        <div className="wrapper-input">
          <span className="warpper-label" htmlFor="Phone">
            SĐT
          </span>
          <InputForm id="phone" value={phone} onChange={handleOnChangePhone} />
          <ButtonComponent
            onClick={handleUpdate}
            className=""
            textButton={"Cập nhật"}
          ></ButtonComponent>
        </div>
        <div className="wrapper-input">
          <span className="warpper-label" htmlFor="Address">
            Địa chỉ
          </span>
          <InputForm
            id="address"
            value={address}
            onChange={handleOnChangeAddress}
          />
          <ButtonComponent
            onClick={handleUpdate}
            className=""
            textButton={"Cập nhật"}
          ></ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
