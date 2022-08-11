import { urls, requests } from './configs';

export default {
  getAll: async (payload, param) => {
    return requests.get(urls.studyResource, payload, param);
  },
};
