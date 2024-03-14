import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import threeDot from "../../assets/icons/3dots.svg";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Spinner from "../common/Spinner";
import deleteIcon from "../../assets/icons/delete.svg";
import api from "../../api";
import modalManager from "../../store/ModalStore";

function CommentCard({ comment, blogId, authorId: blogAuthorId }) {
  const { userId } = useAuth();
  const author = comment?.author;

  return (
    <div className="flex items-start my-8 space-x-4">
      <div className="text-white bg-indigo-600 avater-img">
        <Link to={`/profile/${author?.id}`}>
          {author?.avatar ? (
            <div className="w-full h-full overflow-hidden rounded-full">
              <img
                className="object-cover w-full h-full"
                src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/avatar/${
                  author.avatar
                }`}
                alt={name}
              />
            </div>
          ) : (
            <span className="">{author?.firstName?.slice(0, 1)}</span>
          )}
        </Link>
      </div>
      <div className="relative w-full">
        <Link to={`/profile/${author?.id}`}>
          <h5 className="font-bold text-slate -500">
            {author?.firstName} {author.lastName}
          </h5>
        </Link>
        <p className="text-slate-300 mr-5">{comment?.content}</p>
        {userId === author?.id && (
          <Actions
            commentId={comment?.id}
            blogId={blogId}
            blogAuthorId={blogAuthorId}
          />
        )}
      </div>
    </div>
  );
}

export default CommentCard;

async function deleteComment({ commentId, blogId }) {
  return api.delete(`/blogs/${blogId}/comment/${commentId}`);
}

function Actions({ commentId, blogId, blogAuthorId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPendeing } = useMutation({
    mutationFn: deleteComment,
    onSuccess(res) {
      if (blogAuthorId === userId) {
        queryClient.setQueryData(["profile", userId], (oldProfile) => {
          const newProfile = structuredClone(oldProfile);
          newProfile.blogs = newProfile.blogs.map((b) => {
            if (b.id === blogId) return res?.data;
            return b;
          });
          return newProfile;
        });
      }
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
    onError(err) {
      modalManager.openModal({
        modalText:
          err?.response?.data?.message ||
          err?.message ||
          "Somting Went Wrong While Deleting Blog",
      });
    },
  });

  return (
    <div className="absolute right-0 top-0 bottom-0 flex">
      <button onClick={() => setMenuOpen((mo) => !mo)}>
        <img src={threeDot} alt="3dots of Action" />
      </button>
      {menuOpen && (
        <div className="action-modal-container">
          <button
            className="action-menu-item hover:text-red-500 relative"
            onClick={() => {
              mutate({ commentId, blogId });
            }}
          >
            {isPendeing ? (
              <Spinner
                loadingInfo={"deleting blog"}
                overlay={false}
                size={"small"}
              />
            ) : (
              <>
                <img src={deleteIcon} alt="Delete" />
                Delete
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
