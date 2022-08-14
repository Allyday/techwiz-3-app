import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://18.143.23.226/api/",
  // baseURL: 'http://localhost:8000/api/',
});

baseAxios.interceptors.request.use((config) => {
  config.headers.common.Accept = "application/json";

  return config;
});

export default baseAxios;
