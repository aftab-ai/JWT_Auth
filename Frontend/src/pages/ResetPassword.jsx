// Third-Party modules.
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Code, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

// Import local modules.
import useAuth from "../hooks/useAuth";
import resetPasswordSchemaValidators from "../validators/resetPasswordSchemaValidators";
import verifyResetPasswordSchemaValidators from "../validators/verifyResetPasswordSchemaValidators";

function ResetPassword() {
  const { userEmail } = useAuth();
  const [sendCode, setSendCode] = useState(false); // Determine steps.
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // Show/Hide New-Password in input.
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Show/Hide Confirm-Password.
  const [cooldown, setCooldown] = useState(0); // Resend code button cooldown.
  const [isResending, setIsResending] = useState(false); // Resending state.
  const [isExpired, setIsExpired] = useState(0); // Code expiration cooldown.
  const navigate = useNavigate(); // Redirect.

  // Recompute form-validation file when code send.
  const resolver = useMemo(() => {
    return zodResolver(
      !sendCode
        ? resetPasswordSchemaValidators
        : verifyResetPasswordSchemaValidators,
    );
  }, [sendCode]);

  // Form controller.
  const {
    register, // Function to register an input field with the form.
    handleSubmit, // Function to handle form submission with validation.
    formState: { errors, isSubmitting, touchedFields }, // Form state (errors, submission status, touched fields).
    reset, // Reset form.
  } = useForm({
    resolver, // Form-Validation logic.
    mode: "onChange", // Trigger validation when field have input(onChange).
    shouldUnregister: false, // Keep form values for inputs that are removed from the DOM(email).
  });

  // API request for sending code.
  const sendCodeRequest = async () => {
    try {
      toast.success("Verification code sent successfully.");

      setSendCode(true); // Step: 2 Activate.
      setCooldown(30);
      setIsExpired(120);
    } catch (error) {
      console.log(error);
      setSendCode(false);
    }
  };

  // Handle resend-code.
  const handleResendCode = async () => {
    if (cooldown > 0 || isResending || isSubmitting) return;

    try {
      setIsResending(true);

      // Resend-code again.
      await sendCodeRequest();
    } finally {
      setIsResending(false);
    }
  };

  // Resend-Code cooldown seconds.
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Code expires time.
  useEffect(() => {
    if (isExpired <= 0) return;

    const timer = setInterval(() => {
      setIsExpired((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  // API request for verify code and reset password.
  const verifyAndResetPassword = async () => {
    try {
      reset();
      navigate("/app/login"); // Redirect to login page.
    } catch (error) {
      // API error res with react-toastify.
      console.log(error);
    }
  };

  // User mask-email.
  const maskEmail = (email) => {
    if (!email || !email.includes("@")) return "";

    const [name, domain] = email.split("@");
    return `${name.slice(0, 2)}****@${domain}`;
  };

  // Code expires time-formate.
  const expiresTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Form submit.
  const onSubmit = async () => {
    // If code expires.
    if (sendCode && isExpired <= 0) {
      toast.error("Code expired! Please request a new one.");
      return;
    }

    // Step: 1 -> Send-Code to registered email.
    if (!sendCode) {
      // Send-Code form submit.
      await sendCodeRequest();
      return;
    }

    // Step: 2 -> Verify-Code and password reset.
    await verifyAndResetPassword();
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
        {/* Heading */}
        {!sendCode ? (
          <div>
            <button
              onClick={() => {
                navigate("/profile");
                reset();
              }}
              className="inline-flex px-3 py-1 cursor-pointer font-bold rounded text-xs text-white bg-[#10403B] hover:bg-[#4C5958]"
            >
              <ArrowLeft className="flex justify-center mr-2 size-4" />{" "}
              <p>Back</p>
            </button>
            <h1 className="mb-1 font-bold text-center text-2xl text-shadow-2xs text-[#10403B]">
              Password Reset
            </h1>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setSendCode(false);
                setCooldown(0);
                setIsExpired(0);
                reset();
              }}
              className="inline-flex px-3 py-1 cursor-pointer font-bold rounded text-xs text-white bg-[#10403B] hover:bg-[#4C5958]"
            >
              <ArrowLeft className="flex justify-center mr-2 size-4" />{" "}
              <p>Back</p>
            </button>
            <h1 className="mb-1 font-bold text-center text-2xl text-shadow-2xs text-[#10403B]">
              Verify Code
            </h1>
          </div>
        )}

        {/* Instruction heading */}
        <div className="mt-2 mb-2 font-semibold text-center text-xs text-[#4C5958]">
          {!sendCode ? (
            <h3>
              Enter your old Password and we'll send you a verification code.
            </h3>
          ) : (
            <>
              <h3>
                We've sent a verification code to{" "}
                <span className="font-bold text-[#10403B]">
                  {maskEmail(userEmail)}
                </span>
              </h3>
            </>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-3 font-semibold text-[#10403B]"
        >
          {!sendCode ? (
            // Step: 1 -> Show Old-Password field.
            // Old-Password
            <div className="relative flex flex-col">
              <label
                htmlFor="oldPassword"
                className="mb-1 font-semibold text-sm"
              >
                Old Password: <span className="text-[#4C5958]">*</span>
              </label>

              <div className="relative">
                <KeyRound
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  color={getIconColor("oldPassword")}
                />

                <input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  {...register("oldPassword")}
                  className={`h-10 w-full px-10 text-sm border rounded-md outline-none 
                    focus:ring-2 focus:ring-[#10403B]/40 focus:border-[#10403B]
                    ${errors.oldPassword ? "border-[#D8581C]" : "border-[#148B48]"}`}
                  placeholder="Enter your old password..."
                  disabled={isSubmitting}
                />

                {/* Show/Hide password button. */}
                <button
                  type="button"
                  onClick={() => setShowOldPassword((v) => !v)}
                  className="absolute flex items-center justify-center right-2 top-1/2 -translate-y-1/2
                      cursor-pointer hover:text-[#4C5958]"
                  aria-label={
                    showOldPassword ? "Hide password" : "Show password"
                  }
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Old-Password validation hint. */}
              <p className="mt-1 text-xs text-[#4C5958]">
                Enter your old Password for confirmation.
              </p>

              {/* Validation error. */}
              {errors.oldPassword && (
                <p className="mt-1 text-sm text-[#D8581C]">
                  {errors.oldPassword.message}
                </p>
              )}
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
                    disabled={isSubmitting || isExpired <= 0}
                  />
                </div>

                {/* Code validation hint. */}
                <p className="mt-1 text-xs text-[#4C5958]">
                  Enter the 6-digit verification code sent to your email.
                </p>

                {/* Validation error. */}
                {errors.code && (
                  <p className="mt-1 text-sm text-[#D8581C]">
                    {errors.code.message}
                  </p>
                )}
              </div>

              {/* Resend-Code button & code expires time.*/}
              <div className="mr-2 text-end text-xs">
                <p className="text-[#4C5958]">Didn't receive the code?</p>
                <p className="inline-block mt-1 mr-1 text-xs text-[#4C5958]">
                  {isExpired > 0 ? (
                    <>
                      Code expires in{" "}
                      <span className="text-[#D8581C]">
                        ({expiresTime(isExpired)})
                      </span>
                      !
                    </>
                  ) : (
                    "Code expired! Please request a new one."
                  )}
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={cooldown > 0 || isSubmitting || isResending}
                  className={` 
                    ${
                      cooldown > 0 || isSubmitting || isResending
                        ? "cursor-not-allowed text-[#4C5958]"
                        : "underline cursor-pointer text-[#10403B] hover:text-[#4C5958]"
                    }`}
                >
                  {isResending ? (
                    "Sending..."
                  ) : cooldown > 0 ? (
                    <>
                      Resend in{" "}
                      <span className="text-[#D8581C]">
                        ({expiresTime(cooldown)})
                      </span>
                    </>
                  ) : (
                    "Resend code"
                  )}
                </button>
              </div>

              {/* New-Password */}
              <div className="relative flex flex-col mt-4">
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
                    disabled={isSubmitting || isExpired <= 0}
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
                    disabled={isSubmitting || isExpired <= 0}
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
              disabled={isSubmitting || (sendCode && isExpired <= 0)}
              className={`h-10 w-full mt-3 font-semibold text-sm rounded-md
                transition-colors bg-[#10403B] text-white hover:bg-[#4C5958]
                focus:outline-none focus:ring-2 focus:ring-[#148B4B]/40 disabled:opacity-60
                ${isSubmitting || (sendCode && isExpired <= 0) ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {!sendCode
                ? isSubmitting
                  ? "Sending verification code..."
                  : "Send verification code"
                : isSubmitting
                  ? "Resetting password..."
                  : "Reset password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
