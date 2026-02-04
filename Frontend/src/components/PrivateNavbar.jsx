// Third-Party modules.
import { Link, NavLink } from "react-router-dom";

function PrivateNavbar() {
  return (
    // Private Navbar.
    <nav className="bg-[#B7BDA9] flex justify-between items-center sticky top-0 z-50">
      {/* Logo. */}
      <div>
        <Link to="/app">
          <img src="/jwt.svg" alt="logo" className="h-16 w-16 ml-8" />
        </Link>
      </div>

      {/* Navbar Links. */}
      <div>
        <NavLink
          to="/"
          className={
            "font-bold text-[#182625] text-shadow-2xs hover:text-[#2F3D40]"
          }
        >
          Home
        </NavLink>
      </div>

      {/* Logout. */}
      <div>
        <button
          className={
            "mx-8 py-1 px-4 rounded-4xl bg-[#182625] text-white hover:bg-[#2F3D40] font-bold"
          }
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default PrivateNavbar;
