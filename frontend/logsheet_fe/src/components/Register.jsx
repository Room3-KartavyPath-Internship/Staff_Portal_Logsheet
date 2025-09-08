import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
    staff_type: "InHouse", // ✅ default value matches enum
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/register", formData);
      toast.success(res.data.message || "Registration successful!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      let errorMessage = "Registration failed!";
      if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />

        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Coco">Coco</option>
          <option value="Staff">Staff</option>
        </select>

        <select name="staff_type" value={formData.staff_type} onChange={handleChange} required>
          {/* ✅ must match enum values exactly */}
          <option value="InHouse">In House</option>
          <option value="Visiting">Visiting</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Register;
