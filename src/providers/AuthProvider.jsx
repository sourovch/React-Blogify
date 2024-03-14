import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";
import Spinner from "../components/common/Spinner";
import { AuthContext } from "../contexts";
import AuthStore from "../store/AuthStore";
import refreshAuthToken from "../utils/refreshTokens";

function AuthProvider({ children }) {
  const auth = useSyncExternalStore(AuthStore.subcribe, AuthStore.getTokens);

  useEffect(() => {
    try {
      if (!auth.authToken) {
        refreshAuthToken();
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [auth.authToken]);

  const loadElm = (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="relative w-screen h-screen"
      key={"load"}
    >
      <Spinner overlay="na" />
    </m.div>
  );

  return (
    <AuthContext.Provider value={auth}>
      <AnimatePresence mode="wait">
        {auth.refreshToken && !auth.authToken ? loadElm : children}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
