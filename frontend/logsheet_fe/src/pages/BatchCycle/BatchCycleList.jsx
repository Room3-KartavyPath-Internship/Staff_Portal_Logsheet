import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function BatchCycleList() {
  const [batchCycles, setBatchCycles] = useState([]);

  // Fetch all batch cycles
  const fetchBatchCycles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/batch-cycles");
      setBatchCycles(res.data);
    } catch (err) {
      toast.error("Failed to fetch batch cycles");
    }
  };

  useEffect(() => {
    fetchBatchCycles();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/batch-cycles/${id}`);
      toast.success(res.data.message);
      fetchBatchCycles(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete batch cycle");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Batch Cycle List</h2>
      <Link to="/batch-cycles/add" className="btn btn-primary mb-3">
        Add Batch Cycle
      </Link>

      <table className="table table-bordered">
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
          {batchCycles.map((bc) => (
            <tr key={bc.id}>
              <td>{bc.id}</td>
              <td>{bc.title}</td>
              <td>{bc.description}</td>
              <td>{bc.startDate}</td>
              <td>{bc.endDate}</td>
              <td>
                <Link to={`/batch-cycles/edit/${bc.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(bc.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
