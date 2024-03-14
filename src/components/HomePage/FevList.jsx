import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../api";
import useAuth from "../../hooks/useAuth";
import SideCard from "./SideCard";

async function getFav() {
  const res = await api.get("/blogs/favourites");
  return res.data;
}

function FavList() {
  const { authToken } = useAuth();
  const { isError, isLoading, isPending, data, error } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFav,
    enabled: !!authToken,
  });

  let errorElm;

  if (!authToken)
    errorElm = (
      <div className="min-h-[200px] flex items-center justify-center flex-col">
        <span className="text-center capitalize">
          Login to see your Favourite Blogs.
        </span>
        <div className="mt-6">
          <Link
            to={"/login"}
            className="w-full p-3 mt-2 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  else if (isError)
    errorElm = (
      <div className="flex items-center justify-center w-full h-full text-red-400">
        {error?.response?.message ||
          error?.message ||
          "Some unexpected Error happened"}
      </div>
    );

  return (
    <SideCard
      title={"Your Favourites ❤️"}
      isError={!authToken || isError}
      errorElm={errorElm}
      isLoading={isLoading || (isPending && authToken)}
      blogs={data?.blogs || []}
    />
  );
}

export default FavList;
