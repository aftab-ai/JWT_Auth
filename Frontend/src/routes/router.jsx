// Third-Party modules.
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Import local modules.
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import NotFound from "../pages/NotFound";
import Loader from "../components/Loader";

// Loads a component only when it’s rendered.
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Landing = lazy(() => import("../pages/Landing"));
const Home = lazy(() => import("../pages/Home"));
const ProfileLayout = lazy(() => import("../pages/profile/ProfileLayout"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));

const router = createBrowserRouter([
  // Need authentication for access private routes.
  {
    element: (
      <Suspense fallback={<Loader />}>
        <PrivateLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "verify-email",
            element: <VerifyEmail />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },

  // Public routes.
  {
    path: "app",
    element: (
      <Suspense fallback={<Loader />}>
        <PublicLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },

  // Not-Found Route.
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
