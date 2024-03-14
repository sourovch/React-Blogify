import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

function ImageInput({ control, validationRules, name, error, thumbnail }) {
  const imageInputRef = useRef();
  const [image, setImage] = useState(null);

  function handleImgChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <div className="relative grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
        {(image || thumbnail) && (
          <>
            <img
              src={
                image ||
                `${import.meta.env.VITE_API_ENDPOINT}/uploads/blog/${thumbnail}`
              }
              alt="selected image"
              className="absolute object-cover w-full h-full -z-10"
            />
            <div className="absolute object-cover w-full h-full -z-10 bg-black/10"></div>
          </>
        )}
        <div
          onClick={() => imageInputRef.current.click()}
          className="flex items-center gap-4 transition-all cursor-pointer hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p>Upload Your Image</p>
        </div>
        <Controller
          control={control}
          name={name}
          rules={validationRules}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <input
                {...field}
                value={value?.fileName}
                type="file"
                name="myImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleImgChange(e);
                  onChange(e.target.files[0]);
                }}
                ref={imageInputRef}
              />
            );
          }}
        />
      </div>
      {error && (
        <div className="mb-1 -mt-3 text-xs text-center text-red-400">
          {error.message}
        </div>
      )}
    </>
  );
}

export default ImageInput;
