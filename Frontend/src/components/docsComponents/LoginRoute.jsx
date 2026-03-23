function LoginRoute() {
  return (
    <div className="m-4 text-justify">
      {/* Title */}
      <h1 className="font-bold text-2xl text-[#10403B]">Sign in Route</h1>

      {/* List */}
      <div className="mt-2 p-2 text-sm border border-[#B7BDA9] rounded">
        <ul className="list-disc list-outside ml-8">
          <li>
            Authenticates the user. If the provided credentials do not match, an
            error is returned.
          </li>
          <li>
            The JWT Access-Token is transmitted using an HTTP-only cookie
            configured with Secure=true and SameSite=Strict.
          </li>
          <li>
            The Access-Token cookie has a lifespan of 20 minutes, while the
            access token itself expires after 15 minutes.
          </li>
          <li>
            The Access-Token includes user payload data, including ID, session
            ID, and role.
          </li>
          <li>
            A cryptographically generated Refresh-Token is transmitted using an
            HTTP-only cookie configured with Secure=true and SameSite=Strict.
            The token expires after 7 days.
          </li>
          <li>
            A cryptographically generated CSRF-Token is included in the JSON
            response.
          </li>
          <li>
            The Refresh-Token and CSRF-Token are hashed and stored in the
            session.
          </li>
          <li>The user session remains valid for 7 days.</li>
        </ul>
      </div>

      {/* Request Body */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">Request Body:</h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "The email address of the new user.",
  "password": "The password of the new user."
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
            Endpoint:
            <span className="text-[#127369]"> POST</span> "/api/v1/auth/signin"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "email": "user1@gmail.com",
  "password": "User1@test"
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
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "statusCode": "200",
  "status": "true",
  "code": "USER_AUTHENTICATED",
  "message": "User logged in successfully.",
  "data": { 
    "csrfToken": "a3af48fc11dd25c80789833272c3c3488cc907ebbb7e7f35045db052457bb719"
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
              {`{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OTFjZDE4MWI4ZmI4YzUyYTBmYWFiYSIsInJvbGUiOiJ1c2VyIiwic2Vzc2lvbklkIjoiNjliYmEwMGE2MTU3N2Q5NDc5YzRjMDUzIiwiaWF0IjoxNzc0MjU1MjQ2LCJleHAiOjE3NzQyNTYxNDYsImF1ZCI6Imh0dHA6Ly9hcGkvdjEvYXV0aC9zaWduSW4iLCJpc3MiOiJodHRwOi8vYXBpL3YxL2F1dGgifQ.rdsAn-SMWvfoQRt_AZIiMUSQ5i4YrGixZFGDgqERFYa",
  "refreshToken": "258ba4abb6163510c231112aa9f4ba4258aaeb14389fd59f44381599841965ec1ef37b99fbc7ccfabe4c50af52ae83edf650f5bdc8bb292096a3d321901e811c"
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default LoginRoute;
