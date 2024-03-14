import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "react-router-dom";
import api from "../api";
import AddComment from "../components/Blog/AddComment";
import CommentCard from "../components/Blog/CommentCard";
import FloatingActions from "../components/Blog/FloatingActions";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { getDate } from "../utils/formateDate";

async function getBlog({ queryKey }) {
  const res = await api.get(`/blogs/${queryKey[1]}`);
  return res.data;
}

function Blog() {
  const { id: blogId } = useParams();
  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: getBlog,
  });
  const { authToken } = useAuth();

  const location = useLocation();

  useDocumentTitle(
    `${isLoading ? "loading" : blog?.title || "post title"} | React Blogify`
  );

  if (isError)
    return (
      <div className="container">
        {error?.response?.message ||
          error?.message ||
          "There was an Unexpected error"}
      </div>
    );
  if (isLoading) return <div className="container">Loading..</div>;

  const author = blog?.author;

  return (
    <>
      <main>
        <section>
          <div className="container py-8 text-center">
            <h1 className="text-3xl font-bold md:text-5xl">{blog?.title}</h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <Link to={`/profile/${author?.id}`}>
                <div className="flex items-center space-x-2 capitalize">
                  <div className="text-white bg-indigo-600 avater-img">
                    {author?.avatar ? (
                      <div className="w-full h-full overflow-hidden rounded-full">
                        <img
                          className="object-cover w-full h-full"
                          src={`${
                            import.meta.env.VITE_API_ENDPOINT
                          }/uploads/avatar/${author.avatar}`}
                          alt={name}
                        />
                      </div>
                    ) : (
                      <span className="">{author?.firstName?.slice(0, 1)}</span>
                    )}
                  </div>
                  <h5 className="text-sm text-slate-500">
                    {author?.firstName} {author?.lastName}
                  </h5>
                </div>
              </Link>
              <span className="text-sm text-slate-700 dot">
                {blog?.createdAt && getDate(blog.createdAt, "date", "iso")}
              </span>
              <span className="text-sm text-slate-700 dot">
                {blog?.likes?.length} Likes
              </span>
            </div>
            <img
              className="object-cover w-full mx-auto md:w-8/12 h-80 md:h-96"
              src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/blog/${
                blog?.thumbnail
              }`}
              alt=""
            />
            <ul className="tags">
              {blog?.tags?.split(",").map((tag, i) => (
                <li key={i} className="capitalize">
                  {tag.trim()}
                </li>
              ))}
            </ul>
            <div
              dangerouslySetInnerHTML={{ __html: blog?.content }}
              className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left prose-2xl"
            />
          </div>
        </section>
        <section id="comments">
          <div className="container w-full mx-auto md:w-10/12">
            <h2 className="my-8 text-3xl font-bold">
              Comments ({blog?.comments?.length})
            </h2>
            {authToken ? (
              <AddComment blogId={blogId} authorId={author?.id} />
            ) : (
              <div className="min-h-[100px] flex items-center justify-center flex-col">
                <span className="text-center capitalize">
                  Login To Add Comment
                </span>
                <div className="mt-6">
                  <Link
                    to={"/login"}
                    state={{ from: location }}
                    className="w-full p-3 mt-2 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
            {blog?.comments?.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                blogId={blogId}
                authorId={author?.id}
              />
            ))}
          </div>
        </section>
      </main>
      <FloatingActions
        commentCount={blog?.comments?.length || 0}
        likes={blog?.likes}
        isFav={blog?.isFavourite}
        blogId={blogId}
        authorId={author?.id}
      />
    </>
  );
}

export default Blog;
