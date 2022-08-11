import { urls, requests } from './configs';

export default {
  getAll: async (payload, param) => {
    return requests.get(urls.getAll, payload);
  },
  studyResource: async (payload, param) => {
    return requests.get(urls.studyResource, payload, param);
  },
};
