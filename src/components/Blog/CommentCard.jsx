import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import threeDot from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { BLOG_ACTION_VARIANTS } from "../../framerMotion/variants";
import useAuth from "../../hooks/useAuth";
import modalManager from "../../store/ModalStore";
import Spinner from "../common/Spinner";

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
                data-load
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
        <p className="mr-5 text-slate-300">{comment?.content}</p>
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
    <div className="absolute top-0 bottom-0 right-0 flex">
      <button onClick={() => setMenuOpen((mo) => !mo)}>
        <img src={threeDot} alt="3dots of Action" />
      </button>
      {menuOpen && (
        <m.div
          variants={BLOG_ACTION_VARIANTS}
          initial="initial"
          animate="animate"
          style={{ originX: 1, originY: 0 }}
          className="action-modal-container"
        >
          <button
            className="relative action-menu-item hover:text-red-500"
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
        </m.div>
      )}
    </div>
  );
}
