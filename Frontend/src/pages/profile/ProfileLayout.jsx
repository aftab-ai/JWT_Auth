// Third-Party modules.
import { Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
