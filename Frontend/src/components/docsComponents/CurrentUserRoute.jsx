function CurrentUserRoute() {
  return (
    <div className="m-4 text-justify">
      {/* Title */}
      <h1 className="font-bold text-2xl text-[#10403B]">Current-User Route</h1>

      {/* List */}
      <div className="mt-2 p-2 text-sm border border-[#B7BDA9] rounded">
        <ul className="list-disc list-outside ml-8">
          <li>
            Returns the user’s basic information for frontend authentication.
          </li>
          <li>
            An Access-Token cookie is required to access this information.
          </li>
        </ul>
      </div>

      {/* Example Request */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">Example Request:</h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <code className="block leading-relaxed py-1 pl-2 rounded text-sm bg-[#B3C1A8]">
            Endpoint:
            <span className="font-semibold text-[#127369]"> GET</span>{" "}
            "/api/v1/auth/current-user"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`Cookie - accessToken: JWT_Token`}
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
  "code": "CURRENT_USER",
  "message": "Get current user successfully.",
  "data": {
    "userId": "6990328925cd071dc88a8838",
    "username": "User 1",
    "email": "user1@gmail.com",
    "verifiedEmail": "true",
    "role": "user"
  }
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default CurrentUserRoute;
