// Third-Party modules.
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

// Import local modules.
import router from "./routes/router";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loader";

function App() {
  const { loading } = useAuth();

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
        theme="colored"
        toastClassName="!font-semibold text-shadow-lg"
      />

      {/* Router */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
