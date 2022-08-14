import { urls, requests } from './configs';

export default {
  getAll: async (token, payload) => {
    return requests.get(urls.revision, token, payload);
  },
  updateLesson: async (token, payload) => {
    return requests.put(
      `${urls.revisionTimeTable}${payload.id}`,
      payload,
      token
    );
  },
};
