import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import { useState } from "react";
import api from "../../api";
import checkIcon from "../../assets/icons/check.svg";
import crossIcon from "../../assets/icons/cross.svg";
import editIcon from "../../assets/icons/edit.svg";
import { BUTTON_VARIANTS } from "../../framerMotion/variants";
import Spinner from "../common/Spinner";

async function setBio(data) {
  return api.patch("/profile", data);
}

function ProfileBio({ bio, edit, userId }) {
  const [showTextArea, setShowTextArea] = useState(false);
  const [text, setText] = useState(bio || "");
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: setBio,
    onSuccess: (res) => {
      queryClient.setQueryData(["profile", userId], (oldProfile) => {
        const newProfile = structuredClone(oldProfile);
        newProfile.bio = res?.data?.user?.bio;
        setShowTextArea(false);
        return newProfile;
      });
    },
  });

  function handleBioChange() {
    const formData = new FormData();

    formData.append("bio", text);
    mutate(formData);
  }

  return (
    <div className="flex items-start gap-2 mt-4 lg:mt-6">
      <div className="relative flex-1">
        {isPending && <Spinner loadingInfo={"chinging profile bio"} />}
        {showTextArea ? (
          <textarea
            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none min-w-20 md:min-w-96"
            placeholder="Write Bio.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        ) : (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
        )}
        {isError && (
          <div className="text-xs text-red-400">
            There wan an unexpected error while chenging bio
          </div>
        )}
      </div>

      {showTextArea && (
        <div className="flex flex-col items-center justify-center gap-2">
          <m.button
            variants={BUTTON_VARIANTS}
            initial="initial"
            whileTap="tap"
            className="relative rounded-full flex-center h-7 w-7"
            onClick={handleBioChange}
            disabled={isPending}
          >
            {isPending && (
              <div className="absolute inset-0 z-10 w-full h-full bg-[#030317]/60"></div>
            )}
            <img src={checkIcon} alt="Check" />
          </m.button>
          <m.button
            variants={BUTTON_VARIANTS}
            initial="initial"
            whileTap="tap"
            className="relative rounded-full flex-center h-7 w-7"
            onClick={() => setShowTextArea(false)}
            disabled={isPending}
          >
            {isPending && (
              <div className="absolute inset-0 z-10 w-full h-full bg-[#030317]/60"></div>
            )}
            <img src={crossIcon} alt="Cross" className="p-[6px]" />
          </m.button>
        </div>
      )}

      {edit && !showTextArea && (
        <m.button
          variants={BUTTON_VARIANTS}
          initial="initial"
          whileTap="tap"
          className="rounded-full flex-center h-7 w-7"
          onClick={() => setShowTextArea(true)}
        >
          <img src={editIcon} alt="Edit" />
        </m.button>
      )}
    </div>
  );
}

export default ProfileBio;
