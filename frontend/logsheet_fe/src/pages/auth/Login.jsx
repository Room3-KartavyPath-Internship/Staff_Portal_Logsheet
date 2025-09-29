
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { login, adminLogin } from "../../services/authApi";
import { motion } from "framer-motion";


import loginBg from "../../images/login-bg.jpg";

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
    <div className="d-flex vh-100">
      
      <div
        className="d-none d-md-block flex-fill"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      
      <div className="d-flex flex-fill align-items-center justify-content-center bg-light">
        <motion.div
          className="card shadow-lg p-4"
          style={{
            maxWidth: "400px",
            width: "80%",
            borderRadius: "15px",
            background: "linear-gradient(135deg, #032c60, #1e88e5)",
            color: "white",
          }}
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, duration: 1.5 }}
        >
          <motion.h3
            className="text-center mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            🔐 Login
          </motion.h3>

          <form onSubmit={handleSubmit}>
            <motion.div
              className="mb-3"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
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
            </motion.div>

            <motion.div
              className="mb-3"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-light w-100 fw-bold"
              style={{ borderRadius: "10px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              🚀 Login
            </motion.button>

            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Link to="/register" className="me-2 text-white fw-bold">
                Register
              </Link>
              |
              <Link to="/forgot-password" className="ms-2 text-white fw-bold">
                Forgot Password?
              </Link>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
