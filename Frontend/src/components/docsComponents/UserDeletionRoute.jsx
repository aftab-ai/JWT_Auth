function UserDeletionRoute() {
  return (
    <div className="m-4 text-justify">
      {/* Title */}
      <h1 className="font-bold text-2xl text-[#10403B]">
        Account-Deletion Route
      </h1>

      {/* List */}
      <div className="mt-2 p-2 text-sm border border-[#B7BDA9] rounded">
        <ul className="list-disc list-outside ml-8">
          <li>
            Terminates all the sessions and removes the user's data from the
            server.
          </li>
          <li>Account deletion requires the user’s registered password.</li>
          <li>
            All Access-Token, CSRF-Token and Refresh-Token would be invalidate.
          </li>
          <li>The cookie would be cleared from the client.</li>
          <li>
            Account deletion requires both a Access-Token and a CSRF-Token.
          </li>
        </ul>
      </div>

      {/* Request Body */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">Request Body:</h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "password": "The password of the registered user."
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
            <span className="font-semibold text-[#D8581C]"> DELETE</span>{" "}
            "/api/v1/auth/delete-user"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "password": "User1@test"
}

Cookie - refreshToken: Refresh_Token
Headers - x-csrf-token: CSRF_Token`}
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
  "code": "USER_DELETED",
  "message": "User-Account deleted successfully.",
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

export default UserDeletionRoute;
