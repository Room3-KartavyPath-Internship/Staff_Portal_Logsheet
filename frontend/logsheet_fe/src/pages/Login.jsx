// import React, { useState } from "react";
// import { login } from "../services/api"; // Import API
// import { useNavigate } from "react-router-dom";
// //import "./form.css";


// import "./Login.css";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(formData);
//       alert(response.message || "Login successful!");
//       // If login success, navigate to dashboard/home
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       <p>
//         <a href="/register">Register</a> |{" "}
//         <a href="/forgot-password">Forgot Password?</a>
//       </p>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { login } from "../services/api"; // Import API
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Scoped styles

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      alert(response.message || "Login successful!");
      // If login success, navigate to dashboard/home
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="links">
          <a href="/register">Register</a> |{" "}
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
