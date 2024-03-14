import { Link } from "react-router-dom";

function SearchContent({ blogId, thumbnail, title, content, onCloseClick }) {
  return (
    <Link
      to={`/blog/${blogId}`}
      onClick={onCloseClick}
      className="flex gap-6 py-2"
    >
      <img
        className="object-contain h-28"
        src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/blog/${thumbnail}`}
        alt={title}
      />
      <div className="mt-2">
        <h3 className="text-xl font-bold text-slate-300">{title}</h3>
        <p className="mt-1 mb-6 text-sm text-slate-500 line-clamp-2">
          {content}
        </p>
      </div>
    </Link>
  );
}

export default SearchContent;
