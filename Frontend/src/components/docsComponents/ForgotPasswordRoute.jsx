function ForgotPasswordRoute() {
  return (
    <div className="m-4 text-justify">
      {/* Title */}
      <h1 className="font-bold text-2xl text-[#10403B]">
        Forgot-Password Route
      </h1>

      {/* List */}
      <div className="mt-2 p-2 text-sm border border-[#B7BDA9] rounded">
        <ul className="list-disc list-outside ml-8">
          <li>
            Resets a user’s password. Requires the user’s registered email
            address to send a verification code.
          </li>
          <li>The verification code must be a six-digit number.</li>
          <li>The verification code remains valid for 2 minutes.</li>
          <li>
            The Forgot Password process consists of two endpoints. The first
            endpoint accepts the user’s registered email address and, upon
            successful validation, sends a verification code to registered
            email. The second endpoint accepts the verification code along with
            the new password and email; upon successful verification, the user’s
            password is reset.
          </li>
          <li>
            The user's new password must be at least 8 characters long and
            contain at least one uppercase letter, one lowercase letter, one
            number, and one special character, with no spaces.
          </li>
          <li>The user's new password will be stored as a hash string.</li>
          <li>
            Upon successful password reset, all user sessions will be
            invalidated.
          </li>
        </ul>
      </div>

      {/* Request Body */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">Request Body:</h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <code className="block leading-relaxed py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: I
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "The email address of the registered user."
}`}
            </code>
          </pre>

          <code className="block leading-relaxed mt-4 py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: II
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "The email address of the registered user.",
  "code": "The six-digit code was sent to a user's registered email address.",
  "newPassword": "The new password of the registered user."
}`}
            </code>
          </pre>
        </div>
      </div>

      {/* Example Request */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">Example Request:</h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <code className="block leading-relaxed py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: I -
            <span className="font-semibold text-[#127369]"> POST</span>{" "}
            "/api/v1/auth/request-forgot-password"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "user1@gmail.com"
}`}
            </code>
          </pre>

          <code className="block leading-relaxed mt-4 py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: II -
            <span className="font-semibold text-[#127369]"> POST</span>{" "}
            "/api/v1/auth/verify-forgot-password"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "user1@gmail.com",
  "code": "123456",
  "password": "User1@test2"
}`}
            </code>
          </pre>
        </div>
      </div>

      {/* Example Response */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">
          Example Response:
        </h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <code className="block leading-relaxed py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: I
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "statusCode": "200",
  "status": "true",
  "code": "VERIFICATION_CODE_SENT",
  "message": "Forgot-Password-Code sent successfully."
}`}
            </code>
          </pre>

          <code className="block leading-relaxed mt-4 py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: II
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "statusCode": "200",
  "status": "true",
  "code": "PASSWORD_RESET_SUCCESSFULL",
  "message": "User Password-Reset successfully. Please log in to continue."
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordRoute;
