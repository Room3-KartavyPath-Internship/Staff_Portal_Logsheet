import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services/authApi";

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
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Register (CoCo/Staff only)</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input className="form-control mb-3" placeholder="First Name" name="firstName" onChange={handleChange} required />
          </div>
          <div className="col">
            <input className="form-control mb-3" placeholder="Last Name" name="lastName" onChange={handleChange} required />
          </div>
        </div>
        <input className="form-control mb-3" type="email" placeholder="Email" name="email" onChange={handleChange} required />
        <input className="form-control mb-3" type="password" placeholder="Password" name="password" onChange={handleChange} required />
        <input className="form-control mb-3" placeholder="Mobile" name="mobile" onChange={handleChange} required />
        <select className="form-control mb-3" name="role" onChange={handleChange}>
          <option value="Staff">Staff</option>
          <option value="CoCo">Course Coordinator</option>
        </select>
        <select className="form-control mb-3" name="staff_type" onChange={handleChange}>
          <option value="InHouse">In House</option>
          <option value="Visiting">Visiting</option>
        </select>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
