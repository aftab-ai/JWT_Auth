// Third-Party modules.
import { Link, NavLink } from "react-router-dom";

function PublicNavbar() {
  return (
    // Public Navbar.
    <nav className="bg-[#B7BDA9] flex justify-between items-center sticky top-0 z-50">
      {/* Logo. */}
      <div>
        <Link to="/">
          <img src="/jwt.svg" alt="logo" className="h-16 w-16 ml-8" />
        </Link>
      </div>

      {/* Signup. */}
      <div>
        <NavLink
          to="/signup"
          className={
            "font-bold text-[#182625] text-shadow-2xs hover:text-[#2F3D40]"
          }
        >
          Signup
        </NavLink>

        {/* Login. */}
        <NavLink
          to="/login"
          className={
            "mx-8 py-1 px-4 rounded-4xl bg-[#182625] text-white hover:bg-[#2F3D40] font-bold"
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default PublicNavbar;
