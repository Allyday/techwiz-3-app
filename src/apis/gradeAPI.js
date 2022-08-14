import { urls, requests } from './configs';

export default {
  getByStudent: async (token, payload) => {
    return requests.get(urls.gradeFamily, token, payload);
  },
  getDashboardTeacher: async (token) => {
    return requests.get(urls.dashboardTeacher, token);
  },
  getByClassSubject: async (token, payload) => {
    return requests.get(urls.grade, token, payload);
  },
  add: async (token, payload) => {
    return requests.post(urls.grade, payload, token);
  },
};
