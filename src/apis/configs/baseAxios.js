import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://18.143.23.226/api/",
  // baseURL: "https://7af8-118-70-125-210.jp.ngrok.io/api/",
  withCredentials: true,
});

baseAxios.interceptors.request.use((config) => {
  config.headers.common.Accept = "application/json";
  config.headers.common["Content-type"] = "application/json";

  return config;
});

export default baseAxios;
