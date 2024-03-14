import { AnimatePresence, motion as m } from "framer-motion";
import { useSyncExternalStore } from "react";
import {
  BUTTON_VARIANTS,
  MODAL_VARIANTS,
  OVERLAY_VARIANTS,
} from "../../framerMotion/variants";
import usePortal from "../../hooks/usePortal";
import modalManager from "../../store/ModalStore";

function Modal() {
  const { showModal, modalHead, modalButtons, modalText } =
    useSyncExternalStore(modalManager.subcribe, modalManager.getModalState); // using external store insted of context because I don't want full tree rerender just for a modal change
  const portal = usePortal();

  return portal(
    <AnimatePresence>
      {showModal && (
        <m.div
          variants={OVERLAY_VARIANTS}
          initial="initial"
          animate="animate"
          exit="initial"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
        >
          <m.div
            variants={MODAL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="initial"
            className="relative w-full max-w-2xl max-h-full p-4"
          >
            <div className="relative rounded-lg shadow bg-dark">
              {!!modalHead && (
                <div className="flex items-center justify-between p-2 rounded-t md:p-3">
                  {typeof modalHead === "string" && (
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {modalHead}
                    </h3>
                  )}
                  <m.button
                    variants={BUTTON_VARIANTS}
                    initial="initial"
                    whileTap="tap"
                    type="button"
                    className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => modalManager.closeModal()}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </m.button>
                </div>
              )}
              <div className="px-5 py-3 space-y-4 md:px-6 md:py-4">
                {modalText}
              </div>
              <div className="flex items-center justify-end px-5 py-4 rounded-b md:py-5 md:px-6">
                {modalButtons?.length > 0 ? (
                  modalButtons.map(
                    ({ text, onClick = () => {}, type, close = true }, i) => {
                      if (type === "primary") {
                        return (
                          <m.button
                            variants={BUTTON_VARIANTS}
                            initial="initial"
                            whileTap="tap"
                            key={i}
                            type="button"
                            className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={(e) => {
                              onClick(e);
                              close && modalManager.closeModal();
                            }}
                          >
                            {text || "primary"}
                          </m.button>
                        );
                      } else {
                        return (
                          <m.button
                            variants={BUTTON_VARIANTS}
                            initial="initial"
                            whileTap="tap"
                            key={i}
                            type="button"
                            onClick={(e) => {
                              onClick(e);
                              close && modalManager.closeModal();
                            }}
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-gray-600 rounded-lg border border-gray-400 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 hover:text-dark"
                          >
                            {text || "secondery"}
                          </m.button>
                        );
                      }
                    }
                  )
                ) : (
                  <m.button
                    variants={BUTTON_VARIANTS}
                    initial="initial"
                    whileTap="tap"
                    type="button"
                    className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => modalManager.closeModal()}
                  >
                    close
                  </m.button>
                )}
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
