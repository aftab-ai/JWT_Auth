function EmailVerificationRoute() {
  return (
    <div className="m-4 text-justify">
      {/* Title */}
      <h1 className="font-bold text-2xl text-[#10403B]">
        User-Verification Route
      </h1>

      {/* List */}
      <div className="mt-2 p-2 text-sm border border-[#B7BDA9] rounded">
        <ul className="list-disc list-outside ml-8">
          <li>
            Verifies the user’s email address by validating a code sent to the
            user’s registered email address.
          </li>
          <li>The verification code must be a six-digit number.</li>
          <li>The verification code remains valid for 2 minutes.</li>
          <li>
            User verification requires both an Access-Token and a CSRF-Token.
          </li>
          <li>
            Upon successful verification, all user sessions will be invalidated.
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
  "code": "The six-digit code was sent to a user's registered email address."
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
            "/api/v1/auth/send-email-verification-code"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "user1@gmail.com"
}

Cookie - accessToken: JWT_Token
Headers - x-csrf-token: CSRF_Token
`}
            </code>
          </pre>

          <code className="block leading-relaxed mt-4 py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: II -
            <span className="font-semibold text-[#127369]"> POST</span>{" "}
            "/api/v1/auth/verify-email"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "user1@gmail.com"
  "code": "123456"
}

Cookie - accessToken: JWT_Token
Headers - x-csrf-token: CSRF_Token
`}
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
  "code": "USER_VERIFICATION_CODE_SENT",
  "message": "User verification code sent successfully."
}`}
            </code>
          </pre>

          <code className="block leading-relaxed mt-8 py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint: II
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "statusCode": "200",
  "status": "true",
  "code": "USER_VERIFIED",
  "message": "User verified successfully. Please log in again.",
  "data": {
    "csrfToken": null
  }
}`}
            </code>
          </pre>

          {/* Cookie */}
          <code className="block leading-relaxed mt-4 py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Cookie:
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`accessToken: Clear
refreshToken: Clear
`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationRoute;
