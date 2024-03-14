import { useState } from "react";
import { useOutlet } from "react-router-dom";

function AnimateOutlet() {
  const o = useOutlet();
  const [outlet] = useState(o);
  return <>{outlet}</>;
}

export default AnimateOutlet;
