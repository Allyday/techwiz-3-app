import { urls, requests } from "./configs";

export default {
  login: async (payload) => {
    return requests.post(urls.login, payload);
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
  getClassSubject: async (payload) => {
    return requests.get(urls.getClassSubject, payload);
  },
};
