import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'https://7af8-118-70-125-210.jp.ngrok.io/api/',
});

baseAxios.interceptors.request.use((config) => {
  config.headers.common.Accept = "application/json";

  return config;
});

export default baseAxios;
