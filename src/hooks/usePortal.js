import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function usePortal() {
  const portalElm = document.getElementById("portal");
  const portalTo = useRef(portalElm);

  useEffect(() => {
    const newDiv = document.createElement("div");
    portalElm.appendChild(newDiv);
    portalTo.current = newDiv;

    return () => {
      newDiv.remove();
    };
  }, [portalElm]);

  return (chilren) => createPortal(chilren, portalTo.current);
}

export default usePortal;
