// Third-Party modules.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, KeyRound } from "lucide-react";

// Import local modules.
import loginSchemaValidators from "../validators/loginSchemaValidators";

function Login() {
  // Form state controller.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchemaValidators),
    mode: "onSubmit",
  });

  const [showPassword, setShowPassword] = useState(false); // Show/Hide Password.
  const [focusedField, setFocusedField] = useState(""); // Track focused input.

  // Form Submit.
  const onSubmit = async (data) => {
    console.log(data);

    reset(); // Reset form input.
  };

  // Determine icon color.
  const getIconColor = (field) => {
    if (errors[field]) return "#D8581C"; // Red for error.
    if (focusedField === field) return "#10403B"; // Sky when focused.
    return "#4C5958"; // Default gray.
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col w-full max-w-md px-6 sm:px-8 py-7 sm:py-8 rounded-xl bg-[#D3D2C7]">
        {/* Heading */}
        <h2 className="mb-4 font-bold text-center text-2xl text-[#10403B]">
          Log in
        </h2>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-3 font-semibold text-[#10403B]"
        >
          {/* Email */}
          <div className="relative flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold text-sm">
              Email:
            </label>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                color={getIconColor("email")}
              />

              <input
                id="email"
                type="text"
                {...register("email")}
                className={`h-10 w-full pl-10 px-3 text-sm border rounded-md outline-none 
                  focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                  ${errors.email ? "border-[#D8581C]" : "border-[#148B48]"}`}
                placeholder="Enter your registered email..."
                disabled={isSubmitting}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
              />
            </div>

            {/* Validation error. */}
            {errors.email && (
              <p className="mt-1 text-sm text-[#D8581C]">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold text-sm">
              Password:
            </label>

            <div className="relative">
              <KeyRound
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                color={getIconColor("password")}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`h-10 w-full px-10 text-sm border rounded-md outline-none
                  focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                  ${errors.password ? "border-[#D8581C]" : "border-[#148B48]"}`}
                placeholder="Enter your password..."
                disabled={isSubmitting}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
              />

              {/* Show/Hide password button. */}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute flex items-center justify-center right-2 top-1/2 -translate-y-1/2
                  cursor-pointer hover:text-[#4C5958]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password validation hint. */}
            <p className="mt-1 text-xs text-[#4C5958]">
              Must be 8+ characters. Include uppercase, lowercase, number &
              special. Space not allowed.
            </p>

            {/* Validation error */}
            {errors.password && (
              <p className="mt-1 text-sm text-[#D8581C]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot-Password link*/}
          <span>
            <Link
              to="/forgot-password"
              className="underline font-bold text-sm hover:text-[#4C5958]"
            >
              Forgot Password...
            </Link>
          </span>

          {/* Login button */}
          <div className="text-center">
            <button
              disabled={isSubmitting}
              className="h-10 w-full mt-3 font-semibold text-sm cursor-pointer rounded-md
                transition-colors bg-[#10403B] text-white hover:bg-[#4C5958]
                focus:outline-none focus:ring-2 focus:ring-[#148B4B]/40 disabled:opacity-60"
            >
              {isSubmitting ? "Authenticating..." : "Log in"}
            </button>
          </div>
        </form>

        {/* Signup Route */}
        <p className="mt-5 font-semibold text-center text-xs text-[#4C5958]">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline font-bold text-[#10403B] hover:text-[#4C5958]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
