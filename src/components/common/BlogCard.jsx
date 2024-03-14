import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getDate } from "../../utils/formateDate";
import BlogActions from "./BlogActions";

function BlogCard({ blog }) {
  const { userId } = useAuth();
  const { id, title, content, thumbnail, author, likes, comments, createdAt } =
    blog;

  return (
    <div className="blog-card">
      <Link to={`/blog/${id}`}>
        <img
          data-load
          className="blog-thumb w-96 min-w-48 md:min-w-96"
          src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/blog/${thumbnail}`}
          alt={title}
        />
      </Link>
      <div className="relative w-full mt-2">
        <Link to={`/blog/${id}`}>
          <h3 className="w-5/6 text-xl break-words text-slate-300 lg:text-2xl">
            <span>{title}</span>
          </h3>
        </Link>
        <p className="mt-1 mb-6 text-base break-words text-slate-500 line-clamp-3">
          {content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 capitalize">
            <Link
              to={`/profile/${author.id}`}
              className="text-white bg-indigo-600 avater-img"
            >
              {author?.avatar ? (
                <div className="w-full h-full overflow-hidden rounded-full">
                  <img
                    data-load
                    className="object-cover w-full h-full"
                    src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/avatar/${
                      author.avatar
                    }`}
                    alt={`${author?.firstName} ${author?.lastName}`}
                  />
                </div>
              ) : (
                <span className="">{author?.firstName?.slice(0, 1)}</span>
              )}
            </Link>

            <div>
              <h5 className="text-sm text-slate-500">
                <Link to={`/profile/${author.id}`}>
                  {author.firstName} {author.lastName}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{createdAt && getDate(createdAt, "date", "iso")}</span>
              </div>
            </div>
          </div>

          <div className="px-2 py-1 text-sm text-slate-700">
            <span className="inline-block mr-3">{likes.length} Likes</span>
            <span>{comments.length} Comments</span>
          </div>
        </div>
        {userId === author?.id && <BlogActions id={id} authorId={author?.id} />}
      </div>
    </div>
  );
}

export default BlogCard;
