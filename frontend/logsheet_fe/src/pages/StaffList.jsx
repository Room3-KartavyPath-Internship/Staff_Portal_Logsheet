

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStaff, deleteStaff } from "../services/StaffService";
import "bootstrap-icons/font/bootstrap-icons.css";

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadStaffs();
  }, []);

  const loadStaffs = () => {
    getAllStaff()
      .then((res) => setStaffs(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      deleteStaff(id)
        .then(() => loadStaffs())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Staff Management</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/add-staff")}
      >
        <i className="bi bi-plus-circle"></i> Add Staff
      </button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Staff Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td>
              <td>{s.roleName}</td>
              <td>{s.staff_type}</td>
              <td>
                <i
                  className="bi bi-pencil-square text-warning mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/edit-staff/${s.id}`)}
                ></i>
                <i
                  className="bi bi-trash text-danger mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(s.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
