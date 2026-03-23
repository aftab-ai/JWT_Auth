function SignupRoute() {
  return (
    <div className="m-4 text-justify">
      {/* Title */}
      <h1 className="font-bold text-2xl text-[#10403B]">Signup Route</h1>

      {/* List */}
      <div className="mt-2 p-2 text-sm border border-[#B7BDA9] rounded">
        <ul className="list-disc list-outside ml-8">
          <li>
            Registers a new user. If the email is already taken, an error is
            returned.
          </li>
          <li>
            The password must be at least 8 characters long and contain at least
            one uppercase letter, one lowercase letter, one number, and one
            special character, with no spaces.
          </li>
          <li>The password will be stored as a hash string.</li>
        </ul>
      </div>

      {/* Request Body */}
      <div className="mt-4">
        <h2 className="font-medium text-lg text-[#4C5958]">Request Body:</h2>
        <div className="mt-1 p-1 border border-[#B7BDA9] rounded">
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "username": "The username of the new user.",
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
            <span className="text-[#127369]"> POST</span> "/api/v1/auth/signup"
          </code>
          <pre className="max-w-full px-2 py-1 font-mono rounded text-xs sm:text-sm bg-[#BFBFBF] overflow-x-auto whitespace-pre scrollbar-thin">
            <code className="block leading-relaxed">
              {`{
  "username": "user1",
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
  "statusCode": "201",
  "status": "true",
  "code": "USER_CREATED",
  "message": "User registered successfully. Please sign in to continue."
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default SignupRoute;
