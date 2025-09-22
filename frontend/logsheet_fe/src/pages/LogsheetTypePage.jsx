import React, { useState, useEffect } from "react";
import {
  getAllLogsheetTypes,
  addLogsheetType,
  updateLogsheetType,
  deleteLogsheetType,
} from "../services/logsheetTypeService";

import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogsheetType() {
  const [logsheetTypes, setLogsheetTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    theoryPercent: "",
    practicalPercent: "",
    topicRequired: false,
    groupRequired: false,
  });

  
  const fetchLogsheetTypes = async () => {
    setLoading(true);
    try {
      const res = await getAllLogsheetTypes();
      if (res.data.success) {
        setLogsheetTypes(res.data.data || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching logsheet types");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogsheetTypes();
  }, []);

 
  const handleShowModal = (logsheetType = null) => {
    if (logsheetType) {
      setIsEditing(true);
      setFormData({ ...logsheetType });
    } else {
      setIsEditing(false);
      setFormData({
        id: null,
        title: "",
        description: "",
        theoryPercent: "",
        practicalPercent: "",
        topicRequired: false,
        groupRequired: false,
      });
    }
    setShowModal(true);
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditing) {
        res = await updateLogsheetType(formData.id, formData);
      } else {
        res = await addLogsheetType(formData);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        fetchLogsheetTypes();
        setShowModal(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving logsheet type");
    }
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this logsheet type?")) {
      try {
        const res = await deleteLogsheetType(id);
        if (res.data.success) {
          toast.success(res.data.message);
          fetchLogsheetTypes();
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error deleting logsheet type");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Logsheet Type</h2>
      <Button className="mb-3" onClick={() => handleShowModal()}>
        + Add Logsheet Type
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Theory %</th>
              <th>Practical %</th>
              <th>Topic Required</th>
              <th>Group Required</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logsheetTypes.length > 0 ? (
              logsheetTypes.map((lt) => (
                <tr key={lt.id}>
                  <td>{lt.id}</td>
                  <td>{lt.title}</td>
                  <td>{lt.description}</td>
                  <td>{lt.theoryPercent}</td>
                  <td>{lt.practicalPercent}</td>
                  <td>{lt.topicRequired ? "Yes" : "No"}</td>
                  <td>{lt.groupRequired ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(lt)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(lt.id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No logsheet types found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Logsheet Type" : "Add Logsheet Type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Theory %</Form.Label>
              <Form.Control
                type="number"
                name="theoryPercent"
                value={formData.theoryPercent}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Practical %</Form.Label>
              <Form.Control
                type="number"
                name="practicalPercent"
                value={formData.practicalPercent}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              name="topicRequired"
              checked={formData.topicRequired}
              onChange={handleChange}
              label="Topic Required"
            />

            <Form.Check
              type="checkbox"
              name="groupRequired"
              checked={formData.groupRequired}
              onChange={handleChange}
              label="Group Required"
            />

            <div className="mt-3">
              <Button type="submit" variant="primary">
                {isEditing ? "Update" : "Save"}
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default LogsheetType;
