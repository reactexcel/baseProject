import axiosInstance from "./axiosInstance";

export const authApi = (email = "", password = "") => {
  return axiosInstance.post(`/login?email=${email}&password=${password}`);
};

export const logoutApi = () => {
  return axiosInstance.post(`/logout`);
};

export const getProfile = token => {
  return axiosInstance.get(`/profile?api_token=${token}`);
};

export const signUpApi = data => {
  return axiosInstance.post("/register", data);
};

export const googleLoginApi = (email, password) => {
  return axiosInstance.get(
    `/login/google?email=${email}&password=${password}`
  );
};
