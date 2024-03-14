import api from "../../api";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import BlogCardSkl from "../Skletons/BlogCardSkl";
import BlogCard from "../common/BlogCard";
import ErrorPage from "../common/ErrorElm";
import Spinner from "../common/Spinner";

const LIMIT = 5;

async function getBlogs({ pageParam = 1 }) {
  const res = await api.get(`/blogs?page=${pageParam}&limit=${LIMIT}`);
  return res.data;
}

function BlogList() {
  const { isError, isPending, data, error, loadingRef, hasNextPage } =
    useInfiniteScroll({
      queryKey: ["blogs"],
      queryFn: getBlogs,
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.page + 1;
        const totalPage = Math.ceil(lastPage.total / LIMIT);
        return nextPage <= totalPage ? nextPage : undefined;
      },
    });

  if (isError) return <ErrorPage customErr={error} />;

  if (isPending)
    return Array(8)
      .fill(0)
      .map((_, i) => <BlogCardSkl key={i} />);

  const blogs = data?.pages
    ? data.pages.reduce((acc, curr) => {
        return [...acc, ...curr.blogs];
      }, [])
    : [];

  return (
    <>
      {blogs?.length > 0 &&
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}

      {hasNextPage ? (
        <div
          className="relative flex items-center justify-center min-h-24"
          ref={loadingRef}
        >
          <Spinner loadingInfo={"loading more products"} overlay={false} />
        </div>
      ) : (
        <div className="flex items-center justify-center mt-2 text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
            />
          </svg>
          <span className="inline-block ml-2">
            Thats all we&lsquo;ve got for you. Have a nice day
          </span>
        </div>
      )}
    </>
  );
}

export default BlogList;
