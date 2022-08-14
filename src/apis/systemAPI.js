import { urls, requests } from './configs';

export default {
  savePushNotiToken: async (token, payload) => {
    return requests.post(urls.notification, payload, token);
  },
  sendReportCard: async (token, payload) => {
    return requests.post(urls.sendReportCard, payload, token);
  },
};
