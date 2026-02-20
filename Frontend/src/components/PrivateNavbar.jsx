// Third-Party modules.
import { Link, NavLink } from "react-router-dom";

// Import local modules.
import useAuth from "../hooks/useAuth";

function PrivateNavbar() {
  const { logout } = useAuth();

  return (
    // Private Navbar.
    <nav
      className="flex justify-between items-center sticky top-0 z-50 
        px-4 sm:px-8 h-14 sm:h-16 bg-[#B7BDA9] shadow-sm"
    >
      {/* Logo. */}
      <Link to="/" className="flex items-center -my-1 sm:-my-2">
        <img src="/jwt.svg" alt="logo" className="h-12 sm:h-16 w-12 sm:w-16" />
      </Link>

      {/* Navbar Links. */}
      {/* Home */}
      <NavLink
        to="/"
        className={
          "font-bold text-[#182625] text-shadow-2xs hover:text-[#2F3D40]"
        }
      >
        Home
      </NavLink>

      {/* Logout. */}
      <button
        className="font-bold text-sm px-4 py-0.5 sm:py-1 border rounded-md  border-[#10403B]
            cursor-pointer transition-colors text-white bg-[#10403B] hover:bg-[#4C5958]"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}

export default PrivateNavbar;
