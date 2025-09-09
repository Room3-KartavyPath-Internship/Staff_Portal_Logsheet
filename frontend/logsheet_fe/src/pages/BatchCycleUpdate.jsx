import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getBatchCycleById,
  updateBatchCycle,
} from "../services/batchCycleApi";
import "./BatchCycleUpdate.css";

const BatchCycleUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getBatchCycleById(id)
      .then((data) => {
        setFormData({
          title: data.title,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
        });
      })
      .catch((err) => alert(`Failed to load batch cycle: ${err.message}`))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBatchCycle(id, formData);
      alert("Batch cycle updated successfully!");
      navigate(`/batch-cycles/${id}`);
    } catch (err) {
      alert(`Failed to update batch cycle: ${err.message}`);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="update-container">
      <h2 className="update-title">Update Batch Cycle</h2>

      <form onSubmit={handleSubmit} className="update-form">
        <label>Cycle Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter cycle title"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter description"
          rows="4"
        />

        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />

        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />

        <div className="button-group">
          <button type="submit" className="btn save-btn">
            <i className="fas fa-save"></i> Update
          </button>
          <Link to={`/batch-cycles/${id}`} className="btn cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BatchCycleUpdate;
