const Order = require("../models/OrderProduct");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
    } = newOrder;
    try {
      const createdOrder = await Order.create({
        orderItems,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        shippingAddress: {
          fullName,
          address,
          city,
          phone,
        },
        user: user,
      });
      if (createdOrder) {
        resolve({
          status: "OK",
          message: "Successfull",
          data: createdOrder,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createOrder,
};
