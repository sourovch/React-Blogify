import { Link } from "react-router-dom";

function BlogOverviewEl({ title, author, likes, comments, id, tags }) {
  return (
    <li>
      <Link to={`/blog/${id}`}>
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {title}
        </h3>
      </Link>
      <p className="text-slate-600 text-sm space-x-1">
        {author?.id &&
        (likes !== null || likes !== undefined) &&
        (comments !== null || comments !== undefined) ? (
          <>
            by
            <Link
              to={`$/profile/${author?.id}`}
              className="space-x-1"
            >{`${author?.firstName} ${author?.lastName}`}</Link>
            <span>·</span> {likes.length} Likes
            <span>·</span> {comments.length} Comments
          </>
        ) : (
          tags
        )}
      </p>
    </li>
  );
}

export default BlogOverviewEl;
