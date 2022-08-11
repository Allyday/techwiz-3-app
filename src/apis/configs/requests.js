import AXIOS from "./baseAxios";

export default {
  get: async (route, token, paramsObj) => {
    let url = route;
    if (paramsObj) url += `?${new URLSearchParams(paramsObj).toString()}`;
    return AXIOS.get(
      url,
      token && { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  post: async (route, payload) => {
    return AXIOS.post(route, payload);
  },
};
