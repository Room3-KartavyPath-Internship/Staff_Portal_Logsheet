

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStaff,
  updateStaff,
  getStaffById,
  getAllRoles,
} from "../services/StaffService";

const StaffForm = () => {
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    roleId: "",
    staffType: "INHOUSE",
  });

  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
   
    getAllRoles()
      .then((res) => setRoles(res.data.data))
      .catch((err) => console.error("Error loading roles:", err));

    
    if (id) {
      getStaffById(id)
        .then((res) => {
          const data = res.data;
          setStaff({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            password: "",
            mobile: data.mobile || "",
            roleId: data.roleId || data.role?.id || "",
            staffType: data.staffType || "INHOUSE",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      
      const updatePayload = {
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        mobile: staff.mobile,
        roleId: staff.roleId,
        staffType: staff.staffType,
      };
      updateStaff(id, updatePayload).then(() => navigate("/staffs"));
    } else {
      
      const createPayload = { ...staff };
      createStaff(createPayload).then(() => navigate("/staffs"));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Staff" : "Add Staff"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={staff.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={staff.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={staff.email}
            onChange={handleChange}
            required
          />
        </div>

        {!id && (
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={staff.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            value={staff.mobile}
            onChange={handleChange}
            required
          />
        </div>

      
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="roleId"
            value={staff.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Staff Type</label>
          <select
            name="staffType"
            className="form-control"
            value={staff.staffType}
            onChange={handleChange}
          >
            <option value="INHOUSE">InHouse</option>
            <option value="VISITING">Visiting</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default StaffForm;

