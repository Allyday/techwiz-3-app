import { urls, requests } from './configs';

export default {
  profileUser: async (token, param) => {
    return requests.get(urls.getProfileUser, token, param);
  },
  updateProfileUser: async (payload, token) => {
    return requests.put(urls.getProfileUser, payload, token);
  },
};
