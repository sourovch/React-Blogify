import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { useState } from "react";
import api from "../../api";
import useProfile from "../../hooks/useProfile";
import Spinner from "../common/Spinner";
import useAuth from "../../hooks/useAuth";
import { BUTTON_VARIANTS } from "../../framerMotion/variants";

function AddComment({ blogId, authorId }) {
  const { profile } = useProfile();

  return (
    <div className="flex space-x-4 items -center">
      <div className="text-white bg-indigo-600 avater-img">
        {profile?.avatar ? (
          <div className="w-full h-full overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full"
              src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/avatar/${
                profile.avatar
              }`}
              alt={name}
            />
          </div>
        ) : (
          <span className="">{profile?.firstName?.slice(0, 1)}</span>
        )}
      </div>
      <CommentTextArea blogId={blogId} authorId={authorId} />
    </div>
  );
}

export default AddComment;

async function postComment({ comment, blogId }) {
  return api.post(`/blogs/${blogId}/comment`, { content: comment });
}

function CommentTextArea({ blogId, authorId }) {
  const { userId } = useAuth();
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postComment,
    onSuccess(res) {
      if (authorId === userId) {
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
  });

  function handleCommentSubmit() {
    if (text.length > 0) {
      setText("");
      mutate({ comment: text, blogId });
    }
  }

  return (
    <div className="relative w-full">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
        placeholder="Write a comment"
      ></textarea>
      {isError && (
        <div className="text-xs text-red-400">
          {error?.response?.data?.message ||
            error?.message ||
            "somthing went wrong while adding comment"}
        </div>
      )}
      <div className="flex justify-end mt-4">
        <m.button
          variants={BUTTON_VARIANTS}
          initial="initial"
          whileTap="tap"
          className="relative px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
          onClick={handleCommentSubmit}
        >
          {isPending ? <Spinner overlay={false} size={"small"} /> : "Comment"}
        </m.button>
      </div>
    </div>
  );
}
