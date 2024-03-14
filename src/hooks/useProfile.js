import { useQuery } from "@tanstack/react-query";
import api from "../api";
import useAuth from "./useAuth";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../contexts";

async function getProfile({ queryKey }) {
  const id = queryKey[1];
  const res = await api.get(`/profile/${id}`);

  return res.data;
}

// a hook that can fetch both userProfile ant other's profile
// it will fetch userProfile only once and will use this data rest of the session(caches will be updated on mutation success)
function useProfile(id = null) {
  const { userId } = useAuth();
  const { userProfile, setUserProfile } = useContext(ProfileContext);

  let enabled = true;
  if ((!userId || userProfile?.id) && !id) enabled = false;

  const { data, error, isLoading, isError, isPending } = useQuery({
    queryKey: ["profile", id || userId],
    queryFn: getProfile,
    enabled,
  });

  useEffect(() => {
    if (!id && data?.id === userId) setUserProfile(data);
    else if (data?.id !== userId && !id) setUserProfile(null);
  }, [data, setUserProfile, id, userId]);

  return {
    profile: userProfile?.id && !id ? userProfile : data,
    error,
    isLoading,
    isError,
    isPending,
  };
}

export default useProfile;
