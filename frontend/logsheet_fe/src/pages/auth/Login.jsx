import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { login } from "../../services/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const credentials = { email, password };

  try {
    const res = await login(credentials);
    console.log(res.data);

    if (res.data && res.data.id) {
      setUser(res.data); // save user in context
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Login failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong!");
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
