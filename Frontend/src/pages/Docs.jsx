// Third-Party modules.
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";

function Docs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col items-center h-auto sm:min-h-screen p-4">
      {/* Title */}
      <h1 className="w-full sm:max-w-5xl m-4 p-4 font-bold text-3xl text-center text-[#10403B] rounded-xl bg-[#B3C1A8]">
        Routes Uses
      </h1>

      {/* Layout */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:max-w-5xl">
        {/* Mobile Select */}
        <div className="block sm:hidden w-full p-2 rounded bg-[#8AA6A3]">
          <select
            onChange={(e) => navigate(e.target.value)}
            value={location.pathname}
            className="w-full p-2 font-bold border rounded text-[#10403B]"
          >
            {/* Public Routes */}
            <optgroup label="Public Routes">
              <option value="/docs/user-signup">User Signup</option>
              <option value="/docs/forgot-password-route">
                Forgot Password
              </option>
              <option value="/docs/login-route">User Login</option>
            </optgroup>

            {/* Private Routes */}
            <optgroup label="Private Routes">
              <option value="/docs/current-user-route">Current User</option>
              <option value="/docs/csrf-refresh-route">
                Refresh CSRF-Token
              </option>
              <option value="/docs/auth-refresh-route">
                Refresh Access-Token
              </option>
              <option value="/docs/email-verification-route">
                Email Verification
              </option>
              <option value="/docs/password-reset-route">Password Reset</option>
              <option value="/docs/logout-route">User Logout</option>
              <option value="/docs/logout-all-route">Logout All</option>
              <option value="/docs/user-deletion-route">Account Delete</option>
            </optgroup>
          </select>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex sm:flex-col sm:gap-4 sm:w-1/5 sm:h-fit p-4 rounded-xl bg-[#8AA6A3]">
          {/* Public Routes */}
          <div className="flex flex-col gap-2 font-bold text-[#4C5958]">
            <p className="border-b text-center text-black">Public Routes</p>
            <NavLink
              to="/docs/user-signup"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              User Signup
            </NavLink>
            <NavLink
              to="/docs/forgot-password-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Forgot Password
            </NavLink>
            <NavLink
              to="/docs/login-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              User Login
            </NavLink>
          </div>

          {/* Private Routes */}
          <div className="flex flex-col gap-2 font-bold text-[#4C5958]">
            <p className="border-b text-center text-black">Private Routes</p>

            <NavLink
              to="/docs/current-user-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Current User
            </NavLink>
            <NavLink
              to="/docs/csrf-refresh-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Refresh CSRF-Token
            </NavLink>

            <NavLink
              to="/docs/auth-refresh-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Refresh Access-Token
            </NavLink>
            <NavLink
              to="/docs/email-verification-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Email Verification
            </NavLink>
            <NavLink
              to="/docs/password-reset-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Password Reset
            </NavLink>
            <NavLink
              to="/docs/logout-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              User Logout
            </NavLink>
            <NavLink
              to="/docs/logout-all-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Logout All
            </NavLink>
            <NavLink
              to="/docs/user-deletion-route"
              className={({ isActive }) =>
                `hover:text-[#10403B] ${isActive && "underline text-[#10403B]"}`
              }
            >
              Account Delete
            </NavLink>
          </div>
        </div>

        <div className="w-full sm:w-4/5 h-fit sm:p-4 rounded sm:rounded-xl bg-[#D3D2C7]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Docs;
