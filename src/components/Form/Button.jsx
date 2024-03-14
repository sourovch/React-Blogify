function Button({ label, className, ...rest }) {
  const formatedClassname =
    className ||
    "w-full mt-2 p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700";
  return (
    <button {...rest} className={formatedClassname}>
      {label}
    </button>
  );
}

export default Button;
