import axios from "axios";
import AuthStore from "../store/AuthStore";
import refreshAuthToken from "../utils/refreshTokens";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authToken = AuthStore.getTokens().authToken;
    if (!config.headers["Authorization"] && authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    if (config.data instanceof FormData)
      config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const prevRequest = err?.config;
    if (
      (err?.response?.status === 400 || err?.response?.status === 403) &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;
      const newAuthToken = await refreshAuthToken();
      prevRequest.headers["Authorization"] = `Bearer ${newAuthToken}`;
      if (prevRequest.data instanceof FormData)
        prevRequest.headers["Content-Type"] = "multipart/form-data";
      return api(prevRequest);
    }
    return Promise.reject(err);
  }
);

export default api;
