import { useRouteError } from "react-router-dom";

export default function ErrorPage({ customErr }) {
  let error;
  const err = useRouteError();
  if (customErr) error = customErr;
  else error = err;

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-h-full space-y-10">
      <h1 className="text-3xl">Oops!</h1>
      <p>{error?.response?.data.message || error.message}</p>
      <p className="text-gray-400">
        <i>
          {error.statusText}
          {error.status}
        </i>
      </p>
    </div>
  );
}
