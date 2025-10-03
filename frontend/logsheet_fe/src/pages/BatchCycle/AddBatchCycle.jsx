import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBatchCycle() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const getAuthHeader = () => {
      const user = JSON.parse(sessionStorage.getItem("user")); 
      if (user && user.token) {
        return {
          Authorization: `Bearer ${user.token}`,
        };
      }
      return {};
    };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://staffportallogsheet-production.up.railway.app/api/batch-cycles", form,{ headers: getAuthHeader() });
      toast.success(res.data.message);
      navigate("/batch-cycles");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add batch cycle");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Batch Cycle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" name="title" className="form-control"
            value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input type="text" name="description" className="form-control"
            value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Start Date</label>
          <input type="date" name="startDate" className="form-control"
            value={form.startDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>End Date</label>
          <input type="date" name="endDate" className="form-control"
            value={form.endDate} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    </div>
  );
}
