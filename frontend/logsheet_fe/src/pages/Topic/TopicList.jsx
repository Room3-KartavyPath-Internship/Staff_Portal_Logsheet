import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TopicList() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/modules/topics");
      setTopics(res.data || []);
    } catch (err) {
      toast.error("Error fetching topics");
      console.error("Error fetching topics:", err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;

    try {
      const res = await axios.delete(`http://localhost:8080/api/modules/topic/${id}`);
      setTopics(topics.filter(t => t.id !== id));
      toast.success(res.data?.message || "Deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting topic");
      console.error("Error deleting topic:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/topics/add")}>
          Add Topic
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Topic List</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Section ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.length ? topics.map(topic => (
                <tr key={topic.id}>
                  <td>{topic.id}</td>
                  <td>{topic.name}</td>
                  <td>{topic.sectionId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/topics/edit/${topic.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(topic.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center">No topics found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
