import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

function useInfiniteScroll({ queryKey, queryFn, getNextPageParam }) {
  const loadingRef = useRef();
  const { isError, isPending, fetchNextPage, data, hasNextPage, error } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      getNextPageParam,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entrys) => {
        const loadingElm = entrys[0];

        if (loadingElm.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    !isPending &&
      !isError &&
      hasNextPage &&
      observer.observe(loadingRef.current);

    return () => {
      observer && observer.disconnect();
    };
  }, [isPending, isError, fetchNextPage, hasNextPage]);

  return {
    loadingRef,
    isError,
    isPending,
    hasNextPage,
    data,
    error,
  };
}

export default useInfiniteScroll;
