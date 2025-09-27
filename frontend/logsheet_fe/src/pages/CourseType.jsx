import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import {
  getAllCourseTypes,
  getCourseTypeById,
  addCourseType,
  updateCourseType,
  deleteCourseType,
} from "../services/courseTypeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function CourseType() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  
  

  
  const fetchCourseTypes = async () => {
    try {
      const res = await getAllCourseTypes();
      if (res.data.success) {
        setCourseTypes(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch course types");
    }
  };

  useEffect(() => {
    fetchCourseTypes();
  }, []);

  
  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({ title: "", description: "" });
    setShowModal(true);
  };

  
  const handleOpenEdit = async (id) => {
    try {
      const res = await getCourseTypeById(id);
      if (res.data.success) {
        setFormData({
          title: res.data.data.title,
          description: res.data.data.description,
        });
        setEditingId(id);
        setIsEditing(true);
        setShowModal(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to load course type");
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await deleteCourseType(id);
      if (res.data.success) {
        setCourseTypes(courseTypes.filter((ct) => ct.courseTypeId !== id));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.warn("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (isEditing) {
        res = await updateCourseType(editingId, formData);
      } else {
        res = await addCourseType(formData);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        fetchCourseTypes();
        setShowModal(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Course Types</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={handleOpenAdd}>
          + Add Course Type
        </Button>
      </div>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseTypes.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No course types found.
              </td>
            </tr>
          ) : (
            courseTypes.map((ct) => (
              <tr key={ct.courseTypeId}>
                <td>{ct.courseTypeId}</td>
                <td>{ct.title}</td>
                <td>{ct.description}</td>
                <td>
                  <Button
                    size="sm"
                    className="me-2"
                    variant="primary"
                    onClick={() => handleOpenEdit(ct.courseTypeId)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(ct.courseTypeId)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Edit Course Type" : "Add Course Type"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ?( isEditing ? "Updating...": "Saving..."): (isEditing ? "Update": "Save")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default CourseType;
