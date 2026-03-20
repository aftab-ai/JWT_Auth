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
const VerifyEmail = lazy(() => import("../pages/profile/VerifyEmail"));
const ResetPassword = lazy(() => import("../pages/profile/ResetPassword"));
const Docs = lazy(() => import("../pages/Docs"));
const SignupRoute = lazy(
  () => import("../components/docsComponents/SignupRoute"),
);
const ForgotPasswordRoute = lazy(
  () => import("../components/docsComponents/ForgotPasswordRoute"),
);
const LoginRoute = lazy(
  () => import("../components/docsComponents/LoginRoute"),
);
const CurrentUserRoute = lazy(
  () => import("../components/docsComponents/CurrentUserRoute"),
);
const CSRFRefreshRoute = lazy(
  () => import("../components/docsComponents/CSRFRefreshRoute"),
);
const AuthRefreshRoute = lazy(
  () => import("../components/docsComponents/AuthRefreshRoute"),
);
const EmailVerificationRoute = lazy(
  () => import("../components/docsComponents/EmailVerificationRoute"),
);
const PasswordResetRoute = lazy(
  () => import("../components/docsComponents/PasswordResetRoute"),
);
const LogoutRoute = lazy(
  () => import("../components/docsComponents/LogoutRoute"),
);
const LogoutAllRoute = lazy(
  () => import("../components/docsComponents/LogoutAllRoute"),
);
const UserDeletionRoute = lazy(
  () => import("../components/docsComponents/UserDeletionRoute"),
);

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
      {
        path: "docs",
        element: <Docs />,
        children: [
          { index: true, element: <SignupRoute /> },
          {
            path: "user-signup",
            element: <SignupRoute />,
          },
          {
            path: "forgot-password-route",
            element: <ForgotPasswordRoute />,
          },
          {
            path: "login-route",
            element: <LoginRoute />,
          },
          {
            path: "current-user-route",
            element: <CurrentUserRoute />,
          },
          { path: "csrf-refresh-route", element: <CSRFRefreshRoute /> },
          { path: "auth-refresh-route", element: <AuthRefreshRoute /> },
          {
            path: "email-verification-route",
            element: <EmailVerificationRoute />,
          },
          { path: "password-reset-route", element: <PasswordResetRoute /> },
          { path: "logout-route", element: <LogoutRoute /> },
          { path: "logout-all-route", element: <LogoutAllRoute /> },
          { path: "user-deletion-route", element: <UserDeletionRoute /> },
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
