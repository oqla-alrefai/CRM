// src/utils/auth.js
import Cookies from "js-cookie";
import axios from "axios";

const REFRESH_URL = "https://isoenrollment.onrender.com/api/token/refresh/";

export const saveTokens = ({ access, refresh }) => {
  Cookies.set("access_token", access, { expires: 1 });
  Cookies.set("refresh_token", refresh, { expires: 7 });
};

export const getAccessToken = () => Cookies.get("access_token");

export const refreshAccessToken = async () => {
  const refresh = Cookies.get("refresh_token");
  if (!refresh) throw new Error("No refresh token found");

  const res = await axios.post(REFRESH_URL, { refresh });
  const { access } = res.data;
  Cookies.set("access_token", access, { expires: 1 });
  return access;
};
