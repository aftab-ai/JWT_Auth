// Third-Party modules.
import { Link } from "react-router-dom";

// Landing Page.
function Landing() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col w-full max-w-md px-6 sm:px-8 py-7 sm:py-8 rounded-xl bg-[#D3D2C7]">
        <img
          src="/jwt.svg"
          alt="jwt_img"
          className="p-2 shadow-xl rounded-2xl"
        />

        <h1 className="mt-8 font-bold text-center text-3xl text-shadow-2xs text-[#10403B]">
          JWT Auth Template
        </h1>

        <h3 className="mt-4 font-normal text-center text-base text-[#4C5958]">
          This is an example of "JWT" based authentication/authorization as a
          best practice.
        </h3>

        <p className="mt-8 font-medium text-center text-xs text-[#455559] italic">
          For more details,{" "}
          <Link
            to="/login"
            className="underline not-italic font-bold text-[#10403B]"
          >
            log in
          </Link>{" "}
          or{" "}
          <Link
            to="/signup"
            className="underline not-italic font-bold text-[#10403B]"
          >
            create an account
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Landing;
