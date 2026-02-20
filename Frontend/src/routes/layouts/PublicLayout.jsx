// Third-Party modules.
import { Navigate, Outlet } from "react-router-dom";

// Import local modules.
import PublicNavbar from "../../components/PublicNavbar";
import useAuth from "../../hooks/useAuth";

// Public Layout.
function PublicLayout() {
  const { isAuthenticated } = useAuth(); // Checks user-authentication.

  // If user authentic then redirect to the home page.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[url(/shattered-dark.png)] bg-[#182625]">
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
