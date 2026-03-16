// Third-Party modules.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { toast } from "react-toastify";

// Import local modules.
import userDeletionSchemaValidators from "../validators/userDeletionSchemaValidators";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";

function DeleteAccountModel({ onClose }) {
  // Fetch login from context.
  const { logout } = useAuth();

  const [showPassword, setShowPassword] = useState(false); // Show/Hide Password.

  // Form controller.
  const {
    register, // Function to register an input field with the form.
    handleSubmit, // Function to handle form submission with validation.
    reset, // Reset form.
    formState: { errors, isSubmitting, touchedFields }, // Form state (errors, submission status, touched fields).
  } = useForm({
    resolver: zodResolver(userDeletionSchemaValidators), // Form-Validation logic.
    mode: "onChange", // Trigger validation when field have input(onChange).
  });

  // Form Submit.
  const onSubmit = async (data) => {
    try {
      // API req send for sign in.
      await axiosInstance.delete("/auth/delete-user", { data });

      // API success res with react-toastify.
      toast.success("You have deleted your account successfully.");
      reset(); // Reset form input.
      onClose(); // Close pop-up.
      logout(); // Logout the user.
    } catch (error) {
      const errMessage = error.response?.data?.message;
      toast.error(
        errMessage ? errMessage : "Something went wrong! Please try again.",
      );
    }
  };

  // Determine icon color.
  const iconColors = {
    error: "#D8581C", // Red for error.
    active: "#10403B", // Sky when clicked.
    default: "#4C5958", // Default gray.
  };
  const getIconColor = (field) => {
    return errors[field]
      ? iconColors.error
      : touchedFields
        ? iconColors.active
        : iconColors.default;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-3 text-[#D8581C]">
          Delete Account
        </h2>

        <p className="text-sm mb-4">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-3 font-semibold text-[#10403B]"
        >
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
              Enter your Password for user validation.
            </p>

            {/* Validation error */}
            {errors.password && (
              <p className="mt-1 text-sm text-[#D8581C]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            {/* Cancel button. */}
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-3 py-1 cursor-pointer rounded bg-gray-200 hover:bg-[#BFBFBF] disabled:opacity-60"
            >
              Cancel
            </button>

            {/* Delete button. */}
            <button
              disabled={isSubmitting}
              className="px-3 py-1 cursor-pointer rounded bg-[#D8581C] text-white hover:bg-red-600 disabled:opacity-60"
            >
              {isSubmitting ? "Removing..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccountModel;
