import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import SideCard from "./SideCard";

async function getPopular() {
  const res = await api.get("/blogs/popular");
  return res.data;
}

function PopulerList() {
  const { isError, isLoading, isPending, data, error } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopular,
  });

  return (
    <SideCard
      title={"Most Popular 👍️"}
      isError={isError}
      errorElm={
        <div className="flex items-center justify-center w-full h-full text-red-400">
          {error?.response?.message ||
            error?.message ||
            "Some unexpected Error happened"}
        </div>
      }
      isLoading={isLoading || isPending}
      blogs={data?.blogs || []}
    />
  );
}

export default PopulerList;
