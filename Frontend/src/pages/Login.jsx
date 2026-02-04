import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <p>Login</p>
      <Link to="/forgot-password">Forgot Password</Link>
    </div>
  );
}

export default Login;
