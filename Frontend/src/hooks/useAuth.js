// Third-Party modules.
import { useContext } from "react";

// Import local modules.
import AuthContext from "../context/context";

// Creates a custom useAuth hook.
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider!");
  }
  return context;
};

export default useAuth;
