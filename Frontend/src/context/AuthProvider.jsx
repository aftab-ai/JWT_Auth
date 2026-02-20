// Third-Party modules.
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Import local modules.
import authService from "../api/auth.service";
import { setCSRFToken } from "../api/axiosInstance";
import AuthContext from "./context";

// Auth provider.
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Don’t recreate function unless dependencies change.
  const fetchCurrentUser = useCallback(async () => {
    try {
      const data = await authService.currentUserRequest(); // Fetch current user.
      setUser(data.data.userId); // Set user with user id.
      return data.data.userId;
    } catch {
      setUser(null); // Not authenticated.
      return null;
    }
  }, []);

  // Run every time when current user value change.
  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      try {
        await fetchCurrentUser();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();
    return () => {
      isMounted = false;
    };
  }, [fetchCurrentUser]);

  // User log in.
  const login = async (credentials) => {
    // Log in api request.
    const data = await authService.loginRequest(credentials);

    // CSRF-Token saves in memory.
    setCSRFToken(data.data.csrfToken);

    // Fetch current user.
    const loggedUser = await fetchCurrentUser();
    return loggedUser;
  };

  // User logout.
  const logout = async () => {
    try {
      await authService.logoutRequest(); // Logout api request.
    } catch (error) {
      toast.error(error.responce?.data?.message);
    } finally {
      setUser(null); // Set user as null.
      setCSRFToken(null); // Set csrf-token null.
      toast.success("You have successfully logged out.");
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user, // True if user exist, False if null.
    login,
    logout,
    refetchUser: fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
