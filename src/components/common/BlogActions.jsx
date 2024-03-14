import { useState } from "react";
import threeDot from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import useAuth from "../../hooks/useAuth";
import Spinner from "./Spinner";
import modalManager from "../../store/ModalStore";

async function reqDeleteBlog(id) {
  return api.delete(`/blogs/${id}`);
}

function BlogActions({ id, authorId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate: deleteBlog, isPending } = useMutation({
    mutationFn: reqDeleteBlog,
    onSuccess(data, id) {
      queryClient.setQueryData(["profile", userId], (oldProfile) => {
        const newProfile = structuredClone(oldProfile);
        newProfile.blogs = oldProfile.blogs.filter(
          ({ id: oldId }) => oldId !== id
        );
        return newProfile;
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError(err) {
      modalManager.openModal({
        modalText:
          err?.response?.data?.message ||
          err?.message ||
          "Somting Went Wrong While Deleting Blog",
      });
    },
  });

  const openConformationModal = () =>
    modalManager.openModal({
      modalHead: "Conformation",
      modalText: "Sure want to delete this blog?",
      modalButtons: [
        {
          type: "primary",
          text: "Confirm",
          onClick() {
            deleteBlog(id);
          },
        },
        {
          text: "Cancle",
        },
      ],
    });

  return (
    <div className="absolute top-0 right-0">
      <button onClick={() => setMenuOpen((mo) => !mo)}>
        <img src={threeDot} alt="3dots of Action" />
      </button>

      {menuOpen && (
        <div className="action-modal-container">
          <Link
            to={`/edit/${id}`}
            state={{ authorId, from: location.pathname }}
            className="action-menu-item hover:text-lwsGreen"
          >
            <img src={editIcon} alt="Edit" />
            Edit
          </Link>
          <button
            className="relative action-menu-item hover:text-red-500"
            onClick={openConformationModal}
          >
            {isPending ? (
              <Spinner
                loadingInfo={"deleting blog"}
                overlay={false}
                size={"small"}
              />
            ) : (
              <>
                <img src={deleteIcon} alt="Delete" />
                Delete
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogActions;
