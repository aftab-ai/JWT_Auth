// Third-Party modules.
import { Link } from "react-router-dom";

// Landing Page.
function Landing() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center flex items-center justify-center flex-wrap h-3/5 w-xl bg-[#D3D2C7] rounded-lg">
        <h1 className="font-bold text-3xl  text-[#10403B]">
          JWT Auth Template
        </h1>
        <p className="font-medium text-lg mx-12 text-[#16796F]">
          An example of "JWT" based authentication / authorization as a best
          practice.
        </p>
        <p className="font-medium text-[#455559] italic">
          <Link to="/login" className="underline text-[#10403B] font-semibold">
            Login
          </Link>{" "}
          and see the details.
        </p>
      </div>
    </div>
  );
}

export default Landing;
