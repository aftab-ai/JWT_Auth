// Third-Party modules.
import { Navigate, Outlet } from "react-router-dom";

// Import local modules.
import PrivateNavbar from "../../components/PrivateNavbar";
import useAuth from "../../hooks/useAuth";

// Private Layout shows when user logged in.
function PrivateLayout() {
  const { isAuthenticated } = useAuth(); // Checks user-authentication.

  // If user in not authenticated then redirect to "/landing" page.
  if (!isAuthenticated) {
    return <Navigate to="/app" replace />;
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
