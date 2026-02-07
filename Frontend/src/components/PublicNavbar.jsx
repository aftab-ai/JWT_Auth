// Third-Party modules.
import { Link, NavLink } from "react-router-dom";

function PublicNavbar() {
  return (
    // Public Navbar.
    <nav
      className="flex justify-between items-center sticky top-0 z-50 
        px-4 sm:px-8 h-14 sm:h-16 bg-[#B7BDA9] shadow-sm"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center -my-1 sm:-my-2">
        <img src="/jwt.svg" alt="logo" className="h-12 sm:h-16 w-12 sm:w-16" />
      </Link>

      {/* Links */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        {/* Signup */}
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `font-bold text-sm px-4 py-0.5 sm:py-1 border rounded-md border-[#10403B]
             transition-colors text-[#10403B] hover:bg-[#4C5958] hover:text-white
            ${isActive && "underline ring-3 ring-[#4C5958]/40"}`
          }
        >
          Sign up
        </NavLink>

        {/* Login */}
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `font-bold text-sm px-4 py-0.5 sm:py-1 border rounded-md border-[#10403B]
            transition-colors text-white bg-[#10403B] hover:bg-[#4C5958]
            ${isActive && "underline ring-3 ring-[#4C5958]/40"}`
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default PublicNavbar;
