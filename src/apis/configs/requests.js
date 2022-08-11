import AXIOS from './baseAxios';

export default {
  get: async (route, paramsObj, token) => {
    let url = route;
    if (paramsObj) url += `?${new URLSearchParams(paramsObj).toString()}`;
    return AXIOS.get(url, token && { headers: { 'X-Access-Token': token } });
  },
  post: async (route, payload) => {
    return AXIOS.post(route, payload);
  },
};
