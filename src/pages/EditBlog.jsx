import BlogForm from "../components/common/BlogForm";
import { motion as m } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import api from "../api";
import useProfile from "../hooks/useProfile";
import { PAGE_TRANSITION_VARIANT } from "../framerMotion/variants";

async function reqEditBlog({ id, data }) {
  return api.patch(`/blogs/${id}`, data);
}

function EditBlog() {
  const location = useLocation();
  const { id: blogId } = useParams();
  const { userId } = useAuth();
  const authorId = location.state?.authorId;
  const from = location.state?.from || "/me";
  const { profile } = useProfile();
  const navigate = useNavigate();

  if (authorId !== userId) navigate(from, { replace: true });

  const blogIndex = profile?.blogs.findIndex((b) => b.id === blogId);
  if (blogIndex === -1) navigate(from, { replace: true });

  const blog = profile?.blogs[blogIndex];
  const formManager = useForm({
    defaultValues: {
      title: blog?.title,
      content: blog?.content,
      tags: blog?.tags,
      thumbnail: blog?.thumbnail,
    },
  });

  const queryClient = useQueryClient();

  const {
    mutate: editBlog,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: reqEditBlog,
    onSuccess({ data }, { id }) {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.setQueryData(["profile", userId], (oldProfile) => {
        const newProfile = structuredClone(oldProfile);
        newProfile.blogs = oldProfile.blogs.map((blog) => {
          if (blog.id !== id) return blog;
          return data;
        });
        return newProfile;
      });
      navigate(from);
    },
  });

  function handleSubmit(value) {
    const formdata = new FormData();

    formdata.append("title", value.title);
    formdata.append("content", value.content);
    formdata.append("tags", value.tags);
    formdata.append("thumbnail", value.thumbnail);

    editBlog({ data: formdata, id: blogId });
  }

  useDocumentTitle("Edit Blog | React Blogify");
  return (
    <m.main
      variants={PAGE_TRANSITION_VARIANT}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <section>
        <div className="container">
          {isError && (
            <div className="text-center text-red-400 capitalize">
              {error?.response?.data?.message ||
                error?.message ||
                "There was an error while adding blog"}
            </div>
          )}
          <BlogForm
            formManager={formManager}
            isLoading={isPending}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </m.main>
  );
}

export default EditBlog;
