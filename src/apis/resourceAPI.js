import { urls, requests } from "./configs";

export default {
  studyResource: async (payload, param) => {
    return requests.get(urls.studyResource, payload, param);
  },
  addResourcesAPI: async (payload, token) => {
    return requests.post(urls.studyResource + "/", payload, token);
  },
};
