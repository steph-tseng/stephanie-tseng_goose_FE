import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_API + "/api",
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    // console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    if (response.data.data?.accessToken) {
      api.defaults.headers.common["authorization"] =
        "Bearer " + response.data.data.accessToken;
      localStorage.setItem(
        "accessToken",
        "Bearer " + response.data.data.accessToken
      );
      // console.log(response.data.data.accessToken);
    }
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);

    // Error Handling here

    return Promise.reject(error);
  }
);

export default api;
