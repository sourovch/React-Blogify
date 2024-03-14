function authStore() {
  let store = {
    authToken: null,
    refreshToken: null,
    userId: null,
  };

  let lisenars = [];

  function omitChange() {
    for (let l of lisenars) {
      l();
    }
  }

  const persist = JSON.parse(localStorage.getItem("persistLoging"));

  return {
    getTokens() {
      if (persist && !store.refreshToken)
        store.refreshToken =
          JSON.parse(localStorage.getItem("persisted"))?.refreshToken ?? null;
      if (persist && !store.userId)
        store.userId =
          JSON.parse(localStorage.getItem("persisted"))?.userId ?? null;
      return store;
    },
    storeTokens({ authToken, refreshToken, userId }) {
      if (authToken) {
        store = { ...store, authToken };
      }
      if (refreshToken) {
        store = { ...store, refreshToken };

        if (persist)
          localStorage.setItem(
            "persisted",
            JSON.stringify({ refreshToken, userId })
          );
        else localStorage.removeItem("persisted");
      }
      if (userId) {
        store = { ...store, userId };
      }

      omitChange();
    },
    deleteToken({ authToken, refreshToken, userId }) {
      if (authToken) store = { ...store, authToken: null };
      if (refreshToken) {
        store = { ...store, refreshToken: null };
        const ls = JSON.parse(localStorage.getItem("persisted"));
        localStorage.setItem(
          "persisted",
          JSON.stringify({ ...ls, refreshToken: null })
        );
      }
      if (userId) {
        store = { ...store, userId: null };
        const ls = JSON.parse(localStorage.getItem("persisted"));
        localStorage.setItem(
          "persisted",
          JSON.stringify({ ...ls, userId: null })
        );
      }

      omitChange();
    },
    subcribe(lisenar) {
      lisenars = [...lisenars, lisenar];

      return () => {
        lisenars = lisenars.filter((l) => l !== lisenar);
      };
    },
  };
}

export default authStore();
