function modalStore() {
  const initStore = {
    showModal: false,
    modalHead: "",
    modalText: "",
    modalButtons: [],
  };
  let store = {
    ...initStore,
  };

  let lisenars = [];

  function omitChange() {
    for (let l of lisenars) {
      l();
    }
  }

  return {
    getModalState() {
      return store;
    },
    openModal(modalData = initStore) {
      store = { ...modalData, showModal: true };

      omitChange();
    },
    closeModal() {
      store = initStore;
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

const modalManager = modalStore();

export default modalManager;
