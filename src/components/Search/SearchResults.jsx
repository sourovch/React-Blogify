import searchIcon from "../../assets/icons/search.svg";
import SearchContent from "./SearchContent";

function SearchResults({ onCloseClick, searchResults, error, isError }) {
  let content;
  if (isError && error?.response?.status === 404) {
    content = (
      <div className="flex flex-col items-center justify-center w-full min-h-[440px]">
        {error.response.data.message || "no blog found"}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex flex-col w-full min-h-[440px]">
        <div className="text-red-400">
          {error.message || "there was an unexpected error"}
        </div>
      </div>
    );
  } else if (searchResults?.data?.length > 0) {
    content = searchResults.data.map((d) => (
      <SearchContent
        key={d.id}
        blogId={d.id}
        content={d.content}
        title={d.title}
        thumbnail={d.thumbnail}
        onCloseClick={onCloseClick}
      />
    ));
  } else {
    content = (
      <div className="flex flex-col items-center justify-center w-full min-h-[440px]">
        <div className="text-xl">
          <img
            src={searchIcon}
            className="m-auto mb-4 w-[5vw] min-w-12"
            alt="search"
          />
          <div>Search Blogs</div>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <h3 className="mt-6 font-bold text-slate-400">Search Results</h3>
      <div className="my-4 divide-y-2 divide-slate-500/30 h-[440px] overflow-y-scroll overscroll-contain">
        {content}
      </div>
    </div>
  );
}

export default SearchResults;
