import { urls, requests } from './configs';

export default {
  getAll: async (token, payload) => {
    return requests.get(urls.revision, token, payload);
  },
};
