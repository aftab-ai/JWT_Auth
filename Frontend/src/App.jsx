// Third-Party modules.
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { X } from "lucide-react";

// Import local modules.
import router from "./routes/router";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loader";

function App() {
  const { loading } = useAuth();

  // React-Toastify close button.
  const CloseButton = ({ closeToast }) => (
    <button
      onClick={closeToast}
      className="text-gray-400 hover:text-gray-600 transition"
    >
      <X size={18} />
    </button>
  );

  if (loading) return <Loader />;

  return (
    <>
      {/* Toast Message */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover
        pauseOnFocusLoss
        draggable
        toastClassName={(
          { type }, // Custom style.
        ) =>
          `
            relative flex items-start gap-3
            w-fit max-w-xs sm:max-w-sm
            px-4 py-3 pl-5 mt-4
            rounded-lg
            shadow-xl
            backdrop-blur-md
            text-sm font-semibold
            transition-all duration-300
            bg-[#1F2E2D]/95 text-[#D3D2C7]
            ${type === "success" && "border-l-4 border-[#148B48]"}
            ${type === "error" && "border-l-4 border-[#D8581C]"}
            ${type === "info" && "border-l-4 border-[#4C5958]"}
            ${type === "warning" && "border-l-4 border-amber-500"}
          `
        }
        closeButton={CloseButton}
      />

      {/* Router */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
