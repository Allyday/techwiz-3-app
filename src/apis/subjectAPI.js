import { urls, requests } from "./configs";

export default {
  getClassSubject: async (token) => {
    return requests.get(urls.getClassSubject, token);
  },
  getSubject: async (token) => {
    return requests.get(urls.getSubject, token);
  },
};
