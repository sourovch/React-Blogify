import { useContext } from "react";
import { AuthContext } from "../contexts";

function useAuth() {
  const auth = useContext(AuthContext);

  return {
    authToken: auth.authToken,
    refreshToken: auth.refreshToken,
    userId: auth.userId,
  };
}

export default useAuth;
