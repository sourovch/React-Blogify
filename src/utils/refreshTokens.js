import api from "../api";
import AuthStore from "../store/AuthStore";
import modalManager from "../store/ModalStore";

async function refreshAuthToken() {
  const refreshToken = AuthStore.getTokens().refreshToken;
  if (refreshToken) {
    try {
      const res = await api.post("/auth/refresh-token", {
        refreshToken,
      });

      if (res.status === 200) {
        AuthStore.storeTokens({ authToken: res.data.accessToken });

        return res.data.accessToken;
      }
    } catch (err) {
      if (
        err.response?.status === 400 ||
        err.response?.status === 403 ||
        err.response?.status === 500
      ) {
        AuthStore.deleteToken({ authToken: true, refreshToken: true }); // access token and refresh token both is invalid logging out
        modalManager.openModal({
          modalHead: true,
          modalText: "Login Expired",
        });
      } else {
        throw err;
      }
    }
  }

  return null;
}

export default refreshAuthToken;
