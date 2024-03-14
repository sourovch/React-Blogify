import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { queryClient } from "./api/queryClient";
import Layout from "./components/Layout";
import ErrorPage from "./components/common/ErrorElm";
import ProtectRoute from "./components/common/ProtectRoute";
import Blog from "./pages/Blog";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Write from "./pages/Write";
import AuthStore from "./store/AuthStore";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/logout",
        loader: () => {
          const { userId } = AuthStore.getTokens();
          queryClient.removeQueries({ queryKey: ["favourites"] });
          queryClient.removeQueries({ queryKey: ["profile", userId] });
          AuthStore.deleteToken({
            authToken: true,
            refreshToken: true,
            userId: true,
          });
          return redirect("/");
        },
      },
      {
        path: "/blog/:id",
        element: <Blog />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        element: <ProtectRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/me",
            element: <Profile />,
          },
          {
            path: "/write",
            element: <Write />,
          },
          {
            path: "/edit/:id",
            element: <EditBlog />,
          },
        ],
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
