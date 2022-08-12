import { urls, requests } from "./configs";

export default {
  getAll: async (payload, param) => {
    return requests.get(urls.getAll, payload);
  },
  getClassSubject: async (payload, param) => {
    return requests.get(urls.getClassSubject, payload, param);
  },
  getSubject: async (payload) => {
    return requests.get(urls.getSubject, payload);
  },
};
