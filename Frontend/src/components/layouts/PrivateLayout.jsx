// Third-Party modules.
import { Navigate, Outlet } from "react-router-dom";

// Import local modules.
import PrivateNavbar from "../PrivateNavbar";

// Private Layout shows when user logged in.
function PrivateLayout() {
  const auth = false;

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[url(/shattered-dark.png)] bg-[#182625]">
      <PrivateNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
