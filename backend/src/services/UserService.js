const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "Error",
          message: "The email is exist",
        });
      }
      // const saltRounds = 10;
      // const myPlaintextPassword = "s0//P4$$w0rD";
      // bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      //   console.log("hash", hash);
      // });
      // console.log("hash", hash);
      const hashPasswd = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hashPasswd,
        // confirmPassword,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Successfull",
          data: createdUser,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "Error",
          message: "The user isnt defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      console.log("compare", comparePassword);
      if (!comparePassword) {
        resolve({
          status: "Error",
          message: "The password or user is incorrect.",
        });
      }

      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      // console.log("access_token", access_token);
      resolve({
        status: "OK",
        message: "Successfull",
        // data: checkUser,
        access_token,
        refresh_token,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user isnt defined",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("updateUser", updatedUser);

      resolve({
        status: "OK",
        message: "Successfull",
        data: updatedUser,
        // data: checkUser,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user isnt defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "Get all success",
        data: allUser,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });

      if (user === null) {
        resolve({
          status: "OK",
          message: "The user isnt defined",
        });
      }

      resolve({
        status: "OK",
        message: "Success",
        data: user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
};
