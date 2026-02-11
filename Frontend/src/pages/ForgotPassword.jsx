// Third-Party modules.
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, KeyRound, Code, ArrowLeft } from "lucide-react";

// Import local modules.
import forgotPasswordSchemaValidators from "../validators/forgotPasswordSchemaValidators";
import verifyForgotPasswordSchemaValidators from "../validators/verifyForgotPasswordSchemaValidators";

function ForgotPassword() {
  const [sendOTP, setSendOTP] = useState(false); // Determine steps.
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); // Show/Hide New-Password in input.
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Show/Hide Confirm-Password.
  const navigate = useNavigate(); // Redirect.

  // Recomputed form-validation file when otp send.
  const resolver = useMemo(() => {
    return zodResolver(
      !sendOTP
        ? forgotPasswordSchemaValidators
        : verifyForgotPasswordSchemaValidators,
    );
  }, [sendOTP]);

  // Form controller.
  const {
    register, // Function to register an input field with the form.
    handleSubmit, // Function to handle form submission with validation.
    formState: { errors, isSubmitting, touchedFields }, // Form state (errors, submission status, touched fields).
  } = useForm({
    resolver, // Form-Validation logic.
    mode: "onChange", // Trigger validation when field have input(onChange).
    shouldUnregister: false, // Keep form values for inputs that are removed from the DOM(email).
  });

  // Form submit.
  const onSubmit = async (data) => {
    // Step: 1 -> Send OTP to registered email.
    if (!sendOTP) {
      // Send OTP form submit.

      console.log(data);
      setRegisteredEmail(data.email);
      setSendOTP(true);

      return;
    }

    // Step: 2 -> Verify OTP and password reset.
    console.log(data);
    navigate("/login"); // Redirect to login page.
  };

  // User mask-email.
  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    return `${name.slice(0, 2)}****@${domain}`;
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
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col w-full max-w-md px-6 sm:px-8 py-7 sm:py-8 rounded-xl bg-[#D3D2C7]">
        {/* Headings */}
        <p className="mb-1 font-bold text-center text-2xl text-[#10403B]">
          {!sendOTP ? "Forgot password?" : "Password Reset"}
        </p>

        <div className="mt-1 mb-2 font-semibold text-center text-xs text-[#4C5958]">
          {!sendOTP ? (
            <p>
              Enter your registered email address and we'll send you a
              verification code.
            </p>
          ) : (
            <>
              <p>
                We've sent a verification code to{" "}
                <span className="font-bold text-[#10403B]">
                  {maskEmail(registeredEmail)}
                </span>
              </p>
              <p className="mt-1">
                Wrong email?{" "}
                <button
                  onClick={() => setSendOTP(false)}
                  className="underline cursor-pointer text-[#10403B] hover:text-[#4C5958]"
                >
                  Change email
                </button>
              </p>
            </>
          )}
        </div>

        {/* Forms */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-3 font-semibold text-[#10403B]"
        >
          {!sendOTP ? (
            // Step: 1 -> Show Email field.
            // Email
            <div className="relative flex flex-col">
              <label htmlFor="email" className="mb-1 font-semibold text-sm">
                Email: <span className="text-[#4C5958]">*</span>
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  color={getIconColor("email")}
                />

                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`h-10 w-full pl-10 px-3 text-sm border rounded-md outline-none 
                    focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                    ${errors.email ? "border-[#D8581C]" : "border-[#148B48]"}`}
                  placeholder="Enter email..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Validation error. */}
              {errors.email && (
                <p className="mt-1 text-sm text-[#D8581C]">
                  {errors.email.message}
                </p>
              )}

              {/* Email validation hint. */}
              <p className="mt-1 text-xs text-[#4C5958]">
                Enter your registered email.
              </p>
            </div>
          ) : (
            <>
              {/* Step: 2 -> Show Code(OTP) & New-Password field. */}
              {/* Code */}
              <div className="relative flex flex-col">
                <label htmlFor="code" className="mb-1 font-semibold text-sm">
                  Code: <span className="text-[#4C5958]">*</span>
                </label>

                <div className="relative">
                  <Code
                    className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                    color={getIconColor("code")}
                  />

                  <input
                    id="code"
                    type="text"
                    {...register("code")}
                    className={`h-10 w-full pl-10 px-3 text-sm border rounded-md outline-none 
                      focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                      ${errors.code ? "border-[#D8581C]" : "border-[#148B48]"}`}
                    placeholder="Enter code..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Code validation hint. */}
                <p className="mt-1 text-xs text-[#4C5958]">
                  Enter 6 digit code(OTP) that sent to your email.
                </p>

                {/* Validation error. */}
                {errors.code && (
                  <p className="mt-1 text-sm text-[#D8581C]">
                    {errors.code.message}
                  </p>
                )}
              </div>

              {/* New-Password */}
              <div className="relative flex flex-col mt-8">
                <label
                  htmlFor="newPassword"
                  className="mb-1 font-semibold text-sm"
                >
                  New Password: <span className="text-[#4C5958]">*</span>
                </label>

                <div className="relative">
                  <KeyRound
                    className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                    color={getIconColor("newPassword")}
                  />

                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword")}
                    className={`h-10 w-full px-10 text-sm border rounded-md outline-none
                      focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                      ${errors.newPassword ? "border-[#D8581C]" : "border-[#148B48]"}`}
                    placeholder="Enter new password..."
                    disabled={isSubmitting}
                  />

                  {/* Show/Hide password button. */}
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((v) => !v)}
                    className="absolute flex items-center justify-center right-2 top-1/2 -translate-y-1/2
                      cursor-pointer hover:text-[#4C5958]"
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password validation hint. */}
                <p className="mt-1 text-xs text-[#4C5958]">
                  Must be 8+ characters. Include uppercase, lowercase, number &
                  special. Space not allowed.
                </p>

                {/* Validation error */}
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-[#D8581C]">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm-Password */}
              <div className="relative flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 font-semibold text-sm"
                >
                  Confirm Password: <span className="text-[#4C5958]">*</span>
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
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* Validation error. */}
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-[#D8581C]">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              disabled={isSubmitting}
              className="h-10 w-full mt-3 font-semibold text-sm cursor-pointer rounded-md
                transition-colors bg-[#10403B] text-white hover:bg-[#4C5958]
                focus:outline-none focus:ring-2 focus:ring-[#148B4B]/40 disabled:opacity-60"
            >
              {!sendOTP
                ? isSubmitting
                  ? "Sending verification code..."
                  : "Send verification code"
                : isSubmitting
                  ? "Resetting password..."
                  : "Reset password"}
            </button>
          </div>
        </form>

        <span className="text-center">
          <Link
            to="/login"
            className="inline-flex mt-6 font-medium text-xs text-[#10403B] hover:text-[#4C5958]"
          >
            <ArrowLeft className="mr-2 size-4" /> Back to log in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default ForgotPassword;
