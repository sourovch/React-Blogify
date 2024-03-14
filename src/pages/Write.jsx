import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api";
import BlogForm from "../components/common/BlogForm";
import { PAGE_TRANSITION_VARIANT } from "../framerMotion/variants";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

const initialValue = {
  title: "",
  content: "",
  tags: "",
  thumbnail: "",
};

async function createBlog(blogData) {
  return api.post("/blogs", blogData);
}

function Write() {
  const formManager = useForm({ defaultValues: initialValue });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: createBlog,
    onSuccess({ data }) {
      queryClient.setQueryData(["profile", userId], (oldProfile) => {
        const newProfile = structuredClone(oldProfile);
        newProfile.blogs.push(data.blog);
        return newProfile;
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/me");
    },
  });

  function handleFormSubmit(value) {
    const formdata = new FormData();

    formdata.append("title", value.title);
    formdata.append("content", value.content);
    formdata.append("tags", value.tags);
    formdata.append("thumbnail", value.thumbnail);

    mutate(formdata);
  }

  useDocumentTitle("New Blog | React Blogify");
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
              {error?.response?.data?.error ||
                error?.message ||
                "There was an error while adding blog"}
            </div>
          )}
          <BlogForm
            formManager={formManager}
            onSubmit={handleFormSubmit}
            isLoading={isPending}
          />
        </div>
      </section>
    </m.main>
  );
}

export default Write;
