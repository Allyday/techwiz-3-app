import { urls, requests } from "./configs";

export default {
  login: async (payload) => {
    return requests.post(urls.login, payload);
  },
  getPin: async (payload, param) => {
    return requests.get(urls.getPin, payload, param);
  },
  checkMobile: async (payload) => {
    return requests.get(urls.checkMobile, payload);
  },
  requestOTP: async (payload) => {
    return requests.post(urls.requestOTP, payload);
  },
  verifyOTP: async (payload) => {
    return requests.post(urls.verifyOTP, payload);
  },
};
