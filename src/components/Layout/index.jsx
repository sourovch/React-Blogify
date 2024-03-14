import { useLocation, ScrollRestoration } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthProvider from "../../providers/AuthProvider";
import Modal from "./Modal";
import { queryClient } from "../../api/queryClient";
import ProfileProvider from "../../providers/ProfileProvider";
import AnimateOutlet from "../common/AnimateOutlet";

function Layout() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <Navbar />
          <AnimatePresence mode="wait">
            <AnimateOutlet key={location.pathname} />
          </AnimatePresence>
          <Modal />
          <Footer />
          <ReactQueryDevtools />
          <ScrollRestoration />
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default Layout;
