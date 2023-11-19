import axios from "axios";

export const getAllWishList = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/wishlist`,
    data
  );
  return res.data;
};
