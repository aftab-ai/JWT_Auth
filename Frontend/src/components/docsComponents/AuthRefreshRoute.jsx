function AuthRefreshRoute() {
  return (
    <div className="m-4 text-justify">
      {/* Title */}
      <h1 className="font-bold text-2xl text-[#10403B]">
        Auth-Token Refresh Route
      </h1>

      {/* List */}
      <div className="mt-2 p-2 text-sm border border-[#B7BDA9] rounded">
        <ul className="list-disc list-outside ml-8">
          <li>
            Implements rotation of JWT authentication tokens to ensure continued
            authentication after short expiration intervals.
          </li>
          <li>
            Refresh tokens undergo atomic rotation together with JWT rotation to
            maintain secure session continuity.
          </li>
          <li>Auth token rotation requires a valid Refresh-Token cookie.</li>
          <li>
            Each rotation of the JWT authentication token extends the user
            session duration.
          </li>
          <li>
            If no changes are detected, the system returns a refresh conflict
            error and removes the session.
          </li>
        </ul>
      </div>

      {/* Example Request */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">Example Request:</h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <code className="block leading-relaxed py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint:
            <span className="text-[#127369]"> POST</span>{" "}
            "/api/v1/auth/auth-refresh"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`Cookie: refreshToken=Refresh_Token`}
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
  "code": "AUTH_REFRESHED",
  "message": "Auth-Token refreshed successfully."
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
  "accessToken": "JWT_Token",
  "refreshToken": "Refresh_Token"
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default AuthRefreshRoute;
