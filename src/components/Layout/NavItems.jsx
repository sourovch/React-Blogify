import { Link } from "react-router-dom";
import searchIcon from "../../assets/icons/search.svg";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

function NavItems({ onSearchClick }) {
  const { authToken } = useAuth();
  const { profile } = useProfile();

  return (
    <>
      {authToken && (
        <li>
          <Link
            to="/write"
            className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
          >
            Write
          </Link>
        </li>
      )}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[21px] h-[21px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span>Home</span>
      </Link>
      <li>
        <button
        onClick={onSearchClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={searchIcon} alt="Search" />
          <span>Search</span>
        </button>
      </li>
      {!authToken ? (
        <li>
          <Link
            to="/login"
            className="transition-all duration-200 text-white/50 hover:text-white"
          >
            Login
          </Link>
        </li>
      ) : (
        <li>
          <Link
            to="/logout"
            className="transition-all duration-200 text-white/50 hover:text-white"
            state={{ from: "/" }}
          >
            Log Out
          </Link>
        </li>
      )}
      {authToken && (
        <li className="flex items-center">
          <div className="text-white bg-orange-600 avater-img">
            {profile?.avatar ? (
              <div className="w-full h-full overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={`${import.meta.env.VITE_API_ENDPOINT}/uploads/avatar/${
                    profile.avatar
                  }`}
                  alt=""
                />
              </div>
            ) : (
              <span className="">{profile?.firstName?.slice(0, 1) || 0}</span>
            )}
          </div>
          <Link to="/me">
            <span className="ml-2 text-white capitalize">{`${
              profile?.firstName || "Name"
            } ${profile?.lastName || "Name"}`}</span>
          </Link>
        </li>
      )}
    </>
  );
}

export default NavItems;
