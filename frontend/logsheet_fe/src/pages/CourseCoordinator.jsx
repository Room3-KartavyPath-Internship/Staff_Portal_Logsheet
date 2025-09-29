
import React, { useEffect, useState } from "react";
import {
  getAllCoordinators,
  getCoordinatorById,
  addCoordinator,
  updateCoordinator,
  deleteCoordinator,
  getAllCourses,
  getAllStaff,
} from "../services/courseCoordinatorService";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const CourseCoordinator = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [courses, setCourses] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCoordinator, setEditingCoordinator] = useState(null);
  const [formData, setFormData] = useState({
    courseId: "",
    staffId: "",
  });

  
  const fetchCoordinators = async () => {
    try {
      const res = await getAllCoordinators();
      setCoordinators(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch coordinators");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await getAllCourses();
      setCourses(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch courses");
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await getAllStaff();
      setStaff(res || []);
    } catch (err) {
      toast.error("Failed to fetch staff");
    }
  };

  useEffect(() => {
    fetchCoordinators();
    fetchCourses();
    fetchStaff();
  }, []);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


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
      <Button
        onClick={() => {
          setFormData({ courseId: "", staffId: "" });
          setEditingCoordinator(null);
          setShowModal(true);
        }}
      >
        Add Coordinator
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th style={{ width: "100px" }}>ID</th>
            <th style={{ width: "250px" }}>Course</th>
            <th style={{ width: "250px" }}>Staff</th>
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

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCoordinator ? "Edit Coordinator" : "Add Coordinator"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Course --</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            
            <Form.Group className="mb-3">
              <Form.Label>Staff</Form.Label>
              <Form.Select
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Staff --</option>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName}
                  </option>
                ))}
              </Form.Select>
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