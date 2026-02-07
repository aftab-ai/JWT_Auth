// Third-Party modules.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Mail, KeyRound } from "lucide-react";

// Import local modules.
import signupSchemaValidators from "../validators/signupSchemaValidators";

function Signup() {
  // Form state controller.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchemaValidators),
    mode: "onSubmit",
  });

  const [showPassword, setShowPassword] = useState(false); // Show/Hide Password.
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Show/Hide Confirm-Password.
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
          Sign Up
        </h2>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-3 font-semibold text-[#10403B]"
        >
          {/* Username */}
          <div className="relative flex flex-col">
            <label htmlFor="username" className="mb-1 font-semibold text-sm">
              Username:
            </label>

            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                color={getIconColor("username")}
              />

              <input
                id="username"
                type="text"
                {...register("username")}
                className={`h-10 w-full pl-10 px-3 text-sm border rounded-md outline-none
                  focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                  ${errors.username ? "border-[#D8581C]" : "border-[#148B4B]"}`}
                placeholder="Enter name..."
                disabled={isSubmitting}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField("")}
              />
            </div>

            {/* Validation error. */}
            {errors.username && (
              <p className="mt-1 text-sm text-[#D8581C]">
                {errors.username.message}
              </p>
            )}
          </div>

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
                placeholder="Enter email..."
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
                placeholder="Enter password..."
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

            {/* Validation Error */}
            {errors.password && (
              <p className="mt-1 text-sm text-[#D8581C]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-1 font-semibold text-sm"
            >
              Confirm Password:
            </label>

            <div className="relative">
              <KeyRound
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                color={getIconColor("confirmPassword")}
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`h-10 w-full px-10 text-sm border rounded-md outline-none
                  focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                  ${errors.confirmPassword ? "border-[#D8581C]" : "border-[#148B48]"}`}
                placeholder="Enter password again..."
                disabled={isSubmitting}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField("")}
              />

              {/* Show/Hide password button. */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute flex items-center justify-center right-2 top-1/2 -translate-y-1/2
                  cursor-pointer hover:text-[#4C5958]"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Validation error. */}
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-[#D8581C]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Signup button. */}
          <div className="text-center">
            <button
              disabled={isSubmitting}
              className="h-10 w-full mt-3 font-semibold text-sm cursor-pointer rounded-md
                transition-colors bg-[#10403B] text-white hover:bg-[#4C5958]
                focus:outline-none focus:ring-2 focus:ring-[#148B4B]/40 disabled:opacity-60"
            >
              {isSubmitting ? "Registering..." : "Create account"}
            </button>
          </div>
        </form>

        {/* Login Route */}
        <p className="mt-5 font-semibold text-center text-xs text-[#4C5958]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline font-bold text-[#10403B] hover:text-[#4C5958]"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
