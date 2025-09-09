



import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBatchCycleById, deleteBatchCycle } from "../services/batchCycleApi";
import "./BatchCycleDetails.css";

const BatchCycleDetail = () => {
  const { id } = useParams();
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getBatchCycleById(id)
      .then((data) => setCycle(data))
      .catch((err) => alert(`Failed to load batch cycle: ${err.message}`))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this batch cycle?")) {
      try {
        await deleteBatchCycle(id);
        alert("Batch cycle deleted successfully!");
        navigate("/batch-cycles");
      } catch (err) {
        alert(`Failed to delete batch cycle: ${err.message}`);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/batch-cycles/update/${id}`);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!cycle) return <p className="not-found">Batch cycle not found.</p>;

  return (
    <div className="detail-page">
      <h1 className="detail-header">Batch Cycle Details</h1>

      {/* Table format */}
      <table className="detail-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cycle.id}</td>
            <td>{cycle.title}</td>
            <td>{cycle.description || "-"}</td>
            <td>{cycle.startDate}</td>
            <td>{cycle.endDate}</td>
            <td>
              <button
                className="btn update-btn"
                onClick={handleUpdate}
                aria-label="Update"
              >
                <i className="fas fa-edit"></i> Update
              </button>
              <button
                className="btn delete-btn"
                onClick={handleDelete}
                aria-label="Delete"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Back Button */}
      <div className="back-btn-container">
        <Link to="/batch-cycles" className="back-link">
          ← Back to Batch Cycles
        </Link>
      </div>
    </div>
  );
};

export default BatchCycleDetail;
