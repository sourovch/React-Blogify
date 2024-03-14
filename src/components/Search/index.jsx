import { useQuery } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { useState } from "react";
import api from "../../api";
import closeIcon from "../../assets/icons/close.svg";
import { OVERLAY_VARIANTS, SEARCH_VARIANTS } from "../../framerMotion/variants";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";

async function reqSearch({ queryKey }) {
  const res = await api.get(`/search?q=${queryKey[1].q}`);
  return res.data;
}

function Search({ onCloseClick }) {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", { q: searchText }],
    queryFn: reqSearch,
    enabled: searchText?.length > 0,
    retry: 0,
  });

  return (
    <m.section
      variants={OVERLAY_VARIANTS}
      initial="initial"
      animate="animate"
      exit="initial"
      className="fixed top-0 left-0 z-50 grid w-full h-full place-items-center bg-slate-800/50 backdrop-blur-sm"
    >
      <m.div
        variants={SEARCH_VARIANTS}
        initial="initial"
        animate="animate"
        exit="initial"
        className="relative w-6/12 p-4 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10"
      >
        <div>
          <h3 className="pl-2 my-2 text-xl font-bold text-slate-400">
            {/* Search for Your Desire Blogs */}
          </h3>
          <SearchBox
            onInputChange={(inputValue) => setSearchText(inputValue)}
            isLoading={isLoading}
          />
        </div>
        <SearchResults
          searchResults={data}
          error={error}
          isError={isError}
          onCloseClick={onCloseClick}
        />
        <button onClick={onCloseClick}>
          <img
            src={closeIcon}
            alt="Close"
            className="absolute w-8 h-8 cursor-pointer right-2 top-2"
          />
        </button>
      </m.div>
    </m.section>
  );
}

export default Search;
