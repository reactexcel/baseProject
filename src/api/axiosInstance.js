import axios from "axios";

/**
 * Create axios instance.
 *
 * @type {AxiosInstance}
 */

const axiosInstance = (() => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  return axios.create({
    baseURL: "http://km-api.webologyappreview.com/",
    headers: headers
    // params: {
    // 	token: `${process.env.REACT_APP_API_TOKEN}`,
    // },
  });
})();

axiosInstance.interceptors.request.use(
  function(config) {
    let token = localStorage.getItem("api_token");
    // config.params = {
    //   ...config.params
    // };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.data && error.response.data.message === "token.expired") {
		localStorage.removeItem("api_token");
      window.location.assign("/login");
    }
    if (
      error.response  && error.response.status && error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.assign("/login");
    }

    if (error.response  && error.response.status && error.response.status === 404) {
      window.location.assign("/404");
    }
    if (error.response  && error.response.status && error.response.status === 500) {
      window.location.assign("/500");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
