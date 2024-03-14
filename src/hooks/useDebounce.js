import { useEffect } from "react";

export default function useDebounce(fn, changingState, duration) {
  useEffect(() => {
    const timeOutKey = setTimeout(fn, duration);

    return () => {
      clearTimeout(timeOutKey);
    };
  }, [changingState, duration, fn]);
}
