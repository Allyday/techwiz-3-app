import { urls, requests } from './configs';

export default {
  profileUser: async (token, param) => {
    return requests.get(urls.user, token, param);
  },
  updateProfileUser: async (payload, token) => {
    return requests.put(urls.user, payload, token);
  },
  searchUserChat: async (token, param) => {
    return requests.get(urls.searchUserChat, token, param);
  },
};
