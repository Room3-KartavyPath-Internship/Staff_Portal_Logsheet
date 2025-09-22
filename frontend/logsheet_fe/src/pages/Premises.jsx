import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import {
  getAllPremises,
  getPremisesById,
  addPremises,
  updatePremises,
  deletePremises,
} from "../services/premisesService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Premises() {
  const [premises, setPremises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
  });

  const fetchPremises = async () => {
    try {
      const res = await getAllPremises();
      setPremises(res.data);
    } catch (err) {
      toast.error("Failed to fetch premises");
    }
  };

  useEffect(() => {
    fetchPremises();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({ title: "", address: "", description: "" });
    setShowModal(true);
  };

  const handleOpenEdit = async (id) => {
    try {
      const res = await getPremisesById(id);
      setFormData({
        title: res.data.title,
        address: res.data.address,
        description: res.data.description,
      });
      setEditingId(id);
      setIsEditing(true);
      setShowModal(true);
    } catch (err) {
      toast.error("Failed to load premises");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await deletePremises(id);
      if (res.data.success) {
        toast.success(res.data.message);
        setPremises((prev) => prev.filter((p) => p.id !== id)); // ✅ immediate update
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.address.trim()) {
      toast.warn("Please fill in title and address");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (isEditing) {
        res = await updatePremises(editingId, formData);
      } else {
        res = await addPremises(formData);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        fetchPremises();
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
  <div className="d-flex justify-content-center align-items-center min-vh-100">
    <div
      className="card shadow p-5 w-500"
      style={{ maxWidth: "2000px" }}
    >
      <h2 className="text-center text-primary mb-5">Premises Management</h2>

      <div className="d-flex justify-content-end mb-5">
        <Button variant="success" onClick={handleOpenAdd}>
          + Add Premises
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th style={{ width: "200px" }}>ID</th>
            <th style={{ width: "400px" }}>Title</th>
            <th style={{ width: "550px" }}>Address</th>
            <th style={{ width: "600px" }}>Description</th>
            <th style={{ width: "600px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {premises.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No premises found.
              </td>
            </tr>
          ) : (
            premises.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.address}</td>
                <td>{p.description}</td>
                <td>
                  <Button
                    size="sm"
                    className="me-2"
                    variant="primary"
                    onClick={() => handleOpenEdit(p.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>

    {/* Modal */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Premises" : "Add Premises"}
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
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
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
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
              ? "Update"
              : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>

    <ToastContainer position="top-right" autoClose={3000} />
  </div>
);

}

export default Premises;
