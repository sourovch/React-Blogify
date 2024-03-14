import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import modalManager from "../../store/ModalStore";
import api from "../../api";

function ProtectRoute() {
  const { authToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // checking tokens
  useEffect(() => {
    (async () => {
      await api.get("blogs/favourites"); // if this req fail for invalid access token axios will delete all tokens
    })();
  }, [location.pathname]);

  useEffect(() => {
    const modalInformation = {
      modalHead: true,
      modalText:
        "You are not logged in or your login may expired, Redirecting to home page",
      modalButtons: [
        {
          type: "primary",
          text: "Login instade?",
          onClick() {
            navigate("/login", { replace: true, state: { from: location } });
          },
        },
      ],
    };

    if (!authToken) {
      modalManager.openModal(modalInformation);
    }
  }, [authToken, location, navigate]);

  return authToken ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default ProtectRoute;
