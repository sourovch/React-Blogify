import { useEffect, useRef } from "react";

function useDocumentTitle(title, persistUnMOunt = false) {
  const defaultTitle = useRef(document.title || "React Blogify | Blogs");

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!persistUnMOunt) document.title = defaultTitle;
    };
  }, [persistUnMOunt]);
}

export default useDocumentTitle;
