import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
