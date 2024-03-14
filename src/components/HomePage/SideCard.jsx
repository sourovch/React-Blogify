import BlogOverViewSkl from "../Skletons/BlogOverViewSkl";
import NothingIndicator from "../common/NothingIndicator";
import BlogOverviewEl from "./BlogOverviewEl";

function SideCard({ blogs, title, isError, errorElm, isLoading }) {
  return (
    <div className="sidebar-card">
      <h3
        className={`text-xl font-semibold text-slate-300 lg:text-2xl ${
          isLoading && "skeleton h-6"
        }`}
      >
        {!isLoading && title}
      </h3>

      <ul className="relative space-y-5 my-5 min-h-[300px]">
        {isError ? (
          errorElm
        ) : isLoading ? (
          Array(4)
            .fill(0)
            .map((_, i) => <BlogOverViewSkl key={i} />)
        ) : blogs?.length > 0 ? (
          blogs.map((blog) => (
            <BlogOverviewEl
              key={blog.id}
              tags={blog.tags}
              id={blog.id}
              title={blog.title}
              author={blog.author}
              likes={blog.likes}
              comments={blog.comments}
            />
          ))
        ) : (
          <NothingIndicator />
        )}
      </ul>
    </div>
  );
}

export default SideCard;
