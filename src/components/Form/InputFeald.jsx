import { useId } from "react";

function InputFeald({
  label,
  type,
  name,
  register = () => [],
  validationSchima = {},
  error,
  ...rest
}) {
  const id = useId();

  const formatedType = ["textarea"].includes(type) ? "text" : type;

  return (
    <div className="mb-7">
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <input
        type={formatedType}
        id={id}
        className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
        name={name}
        {...register(name, validationSchima)}
        {...rest}
      />
      {!!error && (
        <div className="mt-1 ml-1 -mb-6 text-sm text-red-300">{error}</div>
      )}
    </div>
  );
}

export default InputFeald;
