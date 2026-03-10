import axios from "axios";

const API_URL = "http://localhost:4000/";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  return res.data;
};

// Login Step 1: Send email + password, receive OTP
export const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  return res.data;
};

// Login Step 2: Verify OTP code and get JWT token
export const verifyLoginCode = async ({ email, code }) => {
  const res = await axios.post(API_URL + "verify-login", { email, code });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    setAuthToken(res.data.token);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  setAuthToken(null);
};
