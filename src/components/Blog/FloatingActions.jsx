import likeIcon from "../../assets/icons/like.svg";
import likeIconFill from "../../assets/icons/like-filled.svg";
import favIcon from "../../assets/icons/heart.svg";
import favIconFill from "../../assets/icons/heart-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import useProfile from "../../hooks/useProfile";
import api from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import modalManager from "../../store/ModalStore";

async function reqLike(blogId) {
  return api.post(`/blogs/${blogId}/like`);
}
async function reqFav(blogId) {
  return api.patch(`/blogs/${blogId}/favourite`);
}

function FloatingActions({
  likes = [],
  commentCount,
  isFav: fav,
  blogId,
  authorId,
}) {
  const { authToken, userId } = useAuth();
  const { profile } = useProfile();

  const [isLiked, setIsLiked] = useState(
    likes?.find(({ id }) => id === profile?.id)
  );
  const [isFav, setIsFav] = useState(fav);

  const queryClient = useQueryClient();
  const { mutate: like } = useMutation({
    mutationFn: reqLike,
    onSuccess(res) {
      if (authorId === userId) {
        queryClient.setQueryData(["profile", userId], (oldProfile) => {
          const newProfile = structuredClone(oldProfile);
          newProfile.blogs = newProfile.blogs.map((b) => {
            if (b.id === blogId) b.likes = res?.data?.likes;
            return b;
          });
          return newProfile;
        });
      }

      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
    onError() {
      setIsLiked((l) => !l);
    },
  });
  const { mutate: togFav } = useMutation({
    mutationFn: reqFav,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
    onError() {
      setIsFav((f) => !f);
    },
  });

  useEffect(() => {
    setIsFav(authToken ? fav : false);
  }, [fav, setIsFav, authToken]);

  const navigate = useNavigate();
  const location = useLocation();

  const modalInformation = {
    modalHead: true,
    modalText: "You need to be logged in to perform this action",
    modalButtons: [
      {
        type: "primary",
        text: "Login",
        onClick() {
          navigate("/login", { replace: true, state: { from: location } });
        },
      },
      {
        text: "Cancle",
      },
    ],
  };

  function handleLike() {
    if (authToken) {
      setIsLiked((l) => !l);
      like(blogId);
    } else {
      modalManager.openModal(modalInformation);
    }
  }

  function handleTogFev() {
    if (authToken) {
      setIsFav((f) => !f);
      togFav(blogId);
    } else {
      modalManager.openModal(modalInformation);
    }
  }

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li role="button" onClick={handleLike}>
          {isLiked ? (
            <img src={likeIconFill} alt="liked" />
          ) : (
            <img src={likeIcon} alt="like" />
          )}
          <span className={`${isLiked && "text-indigo-600"}`}>
            {likes.length}
          </span>
        </li>

        <li role="button" onClick={handleTogFev}>
          {isFav ? (
            <img src={favIconFill} alt="Favourite" />
          ) : (
            <img src={favIcon} alt="not Favourite" />
          )}
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>{commentCount}</span>
          </li>
        </a>
      </ul>
    </div>
  );
}

export default FloatingActions;
