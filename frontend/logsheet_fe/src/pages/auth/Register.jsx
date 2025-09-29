import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services/authApi";
import { motion } from "framer-motion";


import registerBg from "../../images/register-bg.jpg"; 

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    role: "Staff",
    staff_type: "InHouse",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="d-flex vh-100 w-100">
      
      <div
        className="d-none d-md-block"
        style={{
          flex: 0.8, 
          backgroundImage: `url(${registerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      ></div>

      
      <div
        className="d-flex align-items-center justify-content-center bg-light"
        style={{ flex: 1 }}
      >
        <motion.div
          className="card shadow-lg p-4"
          style={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: "15px",
            background: "linear-gradient(135deg, #032c60, #1e88e5)",
            color: "white",
          }}
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, duration: 1.5 }}
        >
          <motion.h3
            className="text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            📝 Register
          </motion.h3>

          <form onSubmit={handleSubmit}>
            <motion.div
              className="row mb-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <div className="col">
                <input
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="mb-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="mb-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="mb-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <input
                className="form-control"
                placeholder="Mobile"
                name="mobile"
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="mb-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <select className="form-control" name="role" onChange={handleChange}>
                <option value="Staff">Staff</option>
                <option value="CoCo">Course Coordinator</option>
              </select>
            </motion.div>

            <motion.div
              className="mb-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <select className="form-control" name="staff_type" onChange={handleChange}>
                <option value="InHouse">In House</option>
                <option value="Visiting">Visiting</option>
              </select>
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-light w-100 fw-bold"
              style={{ borderRadius: "10px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              🚀 Register
            </motion.button>

            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Link to="/login" className="text-white fw-bold">
                Already have an account? Login
              </Link>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}


