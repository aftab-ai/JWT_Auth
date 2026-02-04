// Third-Party modules.
import { Link } from "react-router-dom";

// Not-Found Page.
function NotFound() {
  return (
    <div
      className="h-screen bg-[url(/shattered-dark.png)] bg-[#182625] 
    flex items-center justify-center text-center"
    >
      <div>
        <h1 className="text-lg font-bold text-[#B7BDA9]">404</h1>
        <h1 className="text-7xl font-bold text-[#B7BDA9] m-6">
          Page not found!
        </h1>
        <h1 className="text-2xl font-medium text-[#8AA6A3] mb-6">
          Sorry, We couldn't find the page you're looking for.
        </h1>
        <Link to="/" className="font-semibold text-[#B7BDA9]">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
