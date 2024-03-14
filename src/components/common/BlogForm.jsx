import { BUTTON_VARIANTS } from "../../framerMotion/variants";
import ImageInput from "../Form/ImageInput";
import Spinner from "./Spinner";
import { motion as m } from "framer-motion";

function BlogForm({ formManager, onSubmit, isLoading }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = formManager;

  return (
    <form className="createBlog" onSubmit={handleSubmit(onSubmit)}>
      <ImageInput
        thumbnail={formManager.getValues().thumbnail}
        control={control}
        validationRules={{ required: "Thumbnail Is Required" }}
        name={"thumbnail"}
        error={errors?.thumbnail}
      />
      <div className="mb-6">
        <input
          {...register("title", { required: "Blog Content Is Required" })}
          type="text"
          id="title"
          name="title"
          placeholder="Enter your blog title"
        />
        {errors?.title && (
          <div className="text-xs text-red-400">{errors?.title?.message}</div>
        )}
      </div>

      <div className="mb-6">
        <input
          {...register("tags", { required: "Blog Content Is Required" })}
          type="text"
          id="tags"
          name="tags"
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
        />
        {errors?.tags && (
          <div className="text-xs text-red-400">{errors?.tags?.message}</div>
        )}
      </div>

      <div className="mb-6">
        <textarea
          {...register("content", {
            required: "Blog Content Is Required",
            minLength: {
              value: 30,
              message: "Content Is Too Small",
            },
          })}
          id="content"
          name="content"
          placeholder="Write your blog content"
          rows="8"
        ></textarea>
        {errors?.content && (
          <div className="text-xs text-red-400">{errors?.content?.message}</div>
        )}
      </div>

      <m.button
        variants={BUTTON_VARIANTS}
        initial="initial"
        whileTap="tap"
        disabled={isLoading}
        className="relative px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
      >
        {isLoading ? (
          <Spinner
            loadingInfo={"adding new form"}
            overlay={false}
            size={"small"}
          />
        ) : (
          "Submit"
        )}
      </m.button>
    </form>
  );
}

export default BlogForm;
