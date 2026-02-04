// Third-Party modules.
import { Link } from "react-router-dom";

function Login() {
  return (
    // Login Form
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center h-3/5 w-xl p-8 bg-[#D3D2C7] rounded-lg">
        {/* Heading */}
        <h2 className="text-[#10403B] font-bold text-2xl">Login</h2>

        <form className="text-[#10403B] font-semibold flex flex-col gap-4 w-full">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <input
              className="p-1 rounded-lg border-[#148B4B] border-2"
              type="text"
              id="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Password:
            </label>
            <input
              className="p-1 rounded-lg border-[#148B4B] border-2"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password..."
            />
          </div>

          {/* Forgot-Password */}
          <Link to="/forgot-password" className="underline font-bold text-sm">
            Forgot Password...
          </Link>

          {/* Login Button */}
          <div className="text-center">
            <input
              className="rounded-full px-4 py-1 mt-4 cursor-pointer bg-[#10403B]
               text-white hover:bg-[#4C5958]"
              type="submit"
              value={"Login"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
