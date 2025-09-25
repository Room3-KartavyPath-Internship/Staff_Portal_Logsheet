// 


import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { login, adminLogin } from "../../services/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      let res;

      // ✅ Hardcoded admin login
      if (email === "admin@system.com") {
        res = await adminLogin(credentials); // call admin login endpoint
      } else {
        // Staff/Co-Co login
        res = await login(credentials);
      }

      if (res.data && res.data.id !== undefined) {
        setUser(res.data); // Save user in context
        toast.success("Login successful!");

        // 🔹 Redirect logic
        if (res.data.role === "Admin") {
          navigate("/dashboard"); // Admin goes directly to dashboard
        } else {
          const firstMenu = res.data.menus && res.data.menus[0]?.path;
          navigate(firstMenu || "/dashboard");
        }
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">Login</h3>
      <form onSubmit={handleSubmit} className="card card-body">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <div className="mt-3 text-center">
          <Link to="/register">Register</Link> |{" "}
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}
//LOGIN.JSX