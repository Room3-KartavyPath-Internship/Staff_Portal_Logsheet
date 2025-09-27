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

     
      if (email === "admin@system.com") {
        res = await adminLogin(credentials);
      } else {
        res = await login(credentials);
      }

     
      if (res.data && res.data.id !== undefined) {
    
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);

        toast.success("Login successful!");

        
        navigate("/");
      } else {
        toast.error("Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="mt-3 text-center">
            <Link to="/register" className="me-2">Register</Link> |
            <Link to="/forgot-password" className="ms-2">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
