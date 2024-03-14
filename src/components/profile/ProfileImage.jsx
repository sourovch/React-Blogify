import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import editIcon from "../../assets/icons/edit.svg";
import api from "../../api";
import Spinner from "../common/Spinner";

async function setAvatar(data) {
  return api.post("/profile/avatar", data);
}

function ProfileImage({ userId, avatar, name, edit }) {
  const imageInputRef = useRef();
  const queryClient = useQueryClient();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: setAvatar,
    onSuccess: (res) => {
      queryClient.setQueryData(["profile", userId], (oldProfile) => {
        const newProfile = structuredClone(oldProfile);
        newProfile.avatar = res?.data?.user?.avatar;
        return newProfile;
      });
    },
  });

  function handleImgInpClick() {
    imageInputRef.current.click();
  }

  function handleImgChange(e) {
    const img = e.target.files[0];
    const formData = new FormData();

    formData.append("avatar", img);
    mutate(formData);
  }

  return (
    <>
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        {isPending && <Spinner loadingInfo={"changing profile image"} />}
        {avatar ? (
          <div className="w-full h-full overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full"
              src={`${
                import.meta.env.VITE_API_ENDPOINT
              }/uploads/avatar/${avatar}`}
              alt={name}
            />
          </div>
        ) : (
          <div className="grid w-full h-full text-5xl text-white bg-orange-600 rounded-full place-items-center">
            <span className="">{name.slice(0, 1)}</span>
          </div>
        )}

        {edit && (
          <>
            <input
              type="file"
              name="myImage"
              accept="image/*"
              className="hidden"
              onChange={handleImgChange}
              ref={imageInputRef}
            />
            <button
              onClick={handleImgInpClick}
              className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80"
            >
              <img src={editIcon} alt="Edit" />
            </button>
          </>
        )}
      </div>
      {isError && (
        <div className="mb-2 -mt-4 text-xs text-red-400 lg:mb-5 lg:-mt-8">
          There was an error setting profile image
        </div>
      )}
    </>
  );
}

export default ProfileImage;
