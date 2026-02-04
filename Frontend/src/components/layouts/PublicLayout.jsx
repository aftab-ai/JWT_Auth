// Third-Party modules.
import { Navigate, Outlet } from "react-router-dom";

// Import local modules.
import PublicNavbar from "../PublicNavbar";

// Public Layout.
function PublicLayout() {
  const auth = false;

  if (auth) {
    return <Navigate to="/app" replace />;
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
