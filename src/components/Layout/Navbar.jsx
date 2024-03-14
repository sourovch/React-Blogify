import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import lwsLogo from "../../assets/logo.svg";
import usePortal from "../../hooks/usePortal";
import Search from "../Search";
import NavItems from "./NavItems";

function Navbar() {
  const [showSearchModal, setShowSearchModal] = useState();
  const portal = usePortal();

  function openSearchModal() {
    setShowSearchModal(true);
  }

  function closeSearchModal() {
    setShowSearchModal(false);
  }

  return (
    <>
      <header>
        <nav className="container">
          {/* <!-- Logo --> */}
          <div>
            <Link href="/">
              <img className="w-32" src={lwsLogo} alt="lws" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center space-x-5">
              <NavItems onSearchClick={openSearchModal} />
            </ul>
          </div>
        </nav>
      </header>
      {portal(
        <AnimatePresence>
          {showSearchModal && (
            <Search onCloseClick={closeSearchModal} key={"search"} />
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default Navbar;
