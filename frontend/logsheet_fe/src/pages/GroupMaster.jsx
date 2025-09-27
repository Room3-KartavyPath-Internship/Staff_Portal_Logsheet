import React, { useEffect, useState } from "react";
import {
  getAllGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  getGroupById,
  getAllCourses,
} from "../services/groupService";

import { Modal, Button, Form, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

function GroupMaster() {
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    courseId: "",
  });

  useEffect(() => {
    fetchGroups();
    fetchCourses();
  }, []);


  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await getAllGroups();
      //console.log(res);
      if (res.success) {
        setGroups(res.data); 
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error loading groups");
    } finally {
      setLoading(false);
    }
  };

 
  const fetchCourses = async () => {
    try {
      const res = await getAllCourses();
      //console.log(res);
      
      if (res.success) {
        setCourses(res.data); 
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error loading courses");
    }
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setFormData({ name: "", description: "", courseId: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = async (id) => {
    try {
      const res = await getGroupById(id);
      if (res.success) {
        setFormData({
          name: res.data.name,
          description: res.data.description,
          courseId: res.data.courseId,
        });
        setEditingId(id);
        setShowModal(true);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching group details");
    }
  };

  const handleSave = async () => {
    try {
      let res;
      if (editingId) {
        res = await updateGroup(editingId, formData);
      } else {
        res = await addGroup(formData);
      }

      if (res.success) {
        toast.success(res.message);
        setShowModal(false);
        fetchGroups();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving group");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this group?")) {
      try {
        const res = await deleteGroup(id);
        if (res.success) {
          toast.success(res.message);
          fetchGroups();
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error deleting group");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Group Master</h2>
      <Button variant="primary" onClick={handleAdd}>
        Add Group
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead className="table-light border-bottom border-dark">
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Description</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g, index) => {
              const course = courses.find((c) => c.id == g.courseId);
                //console.log(course);
              return (
                <tr key={g.id}>
                  <td>{index + 1}</td>
                  <td>{g.name}</td>
                  <td>{g.description}</td>
                  <td>{course ? course.name : g.courseId}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(g.id)}
                      className="me-2"
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(g.id)}
                    >
                     <i className="bi bi-x-lg"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

     
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Group" : "Add Group"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter group name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingId ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default GroupMaster;
