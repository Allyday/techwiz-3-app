import { urls, requests } from './configs';

export default {
  getAll: async (token, payload) => {
    return requests.get(urls.student, token, payload);
  },
};
