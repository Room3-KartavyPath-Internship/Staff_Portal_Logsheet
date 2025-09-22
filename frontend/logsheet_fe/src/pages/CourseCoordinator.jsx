// src/components/CourseCoordinator.jsx
import React, { useEffect, useState } from "react";
import {
  getAllCoordinators,
  getCoordinatorById,
  addCoordinator,
  updateCoordinator,
  deleteCoordinator,
} from "../services/courseCoordinatorService";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const CourseCoordinator = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCoordinator, setEditingCoordinator] = useState(null);
  const [formData, setFormData] = useState({
    courseId: "",
    staffId: "",
  });

  // Fetch coordinators on load
  const fetchCoordinators = async () => {
    try {
      const res = await getAllCoordinators();
      setCoordinators(res.data);
    } catch (err) {
      toast.error("Failed to fetch coordinators");
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle add / update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCoordinator) {
        await updateCoordinator(editingCoordinator.id, formData);
        toast.success("Coordinator updated successfully");
      } else {
        await addCoordinator(formData);
        toast.success("Coordinator added successfully");
      }
      setShowModal(false);
      setFormData({ courseId: "", staffId: "" });
      setEditingCoordinator(null);
      fetchCoordinators();
    } catch (err) {
      toast.error("Failed to save coordinator");
    }
  };

  // Edit
  const handleEdit = async (id) => {
    try {
      const res = await getCoordinatorById(id);
      setEditingCoordinator(res.data);
      setFormData({
        courseId: res.data.courseId || "",
        staffId: res.data.staffId || "",
      });
      setShowModal(true);
    } catch (err) {
      toast.error("Failed to fetch coordinator");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coordinator?")) {
      try {
        await deleteCoordinator(id);
        toast.success("Coordinator deleted successfully");
        fetchCoordinators();
      } catch (err) {
        toast.error("Failed to delete coordinator");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Course Coordinators</h2>
      <Button onClick={() => setShowModal(true)}>Add Coordinator</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>ID</th>
            <th style={{ width: "200px" }}>Course</th>
            <th style={{ width: "200px" }}>Staff</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coordinators.map((coord) => (
            <tr key={coord.id}>
              <td>{coord.id}</td>
              <td>{coord.courseName}</td>
              <td>{coord.staffName}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(coord.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(coord.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCoordinator ? "Edit Coordinator" : "Add Coordinator"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course ID</Form.Label>
              <Form.Control
                type="number"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Staff ID</Form.Label>
              <Form.Control
                type="number"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingCoordinator ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseCoordinator;
