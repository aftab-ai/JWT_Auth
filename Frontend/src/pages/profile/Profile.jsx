// Third-Party modules.
import { Link } from "react-router-dom";
import { useState } from "react";

// Import local modules.
import useAuth from "../../hooks/useAuth";
import DeleteAccountModel from "../../components/DeleteAccountModel";

function Profile() {
  const { username } = useAuth();
  const [showDeleteModel, setShowDeleteModel] = useState(false); // Pop-up for confirmation.

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col w-full max-w-md px-6 sm:px-8 py-7 sm:py-8 rounded-xl bg-[#D3D2C7]">
        {/* Username */}
        <div className="p-0.5 m-4 font-bold text-2xl text-center text-[#10403B]">
          Hello {username}
        </div>

        {/* Links */}
        <div className="flex items-center flex-col w-full space-y-3 font-semibold">
          {/* Verify Email */}
          <Link
            to="/profile/verify-email"
            className="text-[#4C5958] hover:text-[#10403B]"
          >
            Verify Email
          </Link>

          {/* Reset Password */}
          <Link
            to="/profile/reset-password"
            className="text-[#4C5958] hover:text-[#10403B]"
          >
            Reset Password
          </Link>

          {/* Delete Account */}
          <button
            onClick={() => setShowDeleteModel(true)}
            className="cursor-pointer text-[#D8581C] hover:text-red-600"
          >
            Delete Account
          </button>
          {showDeleteModel && (
            <DeleteAccountModel onClose={() => setShowDeleteModel(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
