
import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import {
  getAllModules,
  getModuleById,
  addModule,
  updateModule,
  deleteModule,
  getAllStaff,
  getAllSubjects
} from "../services/modulesService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [staff, setStaff] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    theoryHours: 0,
    practicalHours: 0,
    moduleRouterId: null,
    subjectIds: [],
  });

 
  const fetchModules = async () => {
    try {
      const res = await getAllModules();
      setModules(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch modules");
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await getAllStaff();
     
      setStaff(res);
    } catch (err) {
      toast.error("Failed to fetch staff");
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await getAllSubjects();
      setSubjects(res || []);
    } catch (err) {
      toast.error("Failed to fetch subjects");
    }
  };

  useEffect(() => {
    fetchModules();
    fetchStaff();
    fetchSubjects();
  }, []);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingModule) {
        await updateModule(editingModule.id, formData);
        toast.success("Module updated successfully");
      } else {
        await addModule(formData);
        toast.success("Module added successfully");
      }
      setShowModal(false);
      setEditingModule(null);
      setFormData({
        title: "",
        description: "",
        theoryHours: 0,
        practicalHours: 0,
        moduleRouterId: null,
        subjectIds: [],
      });
      fetchModules();
    } catch (err) {
      toast.error("Operation failed");
    }
  };


  const handleEdit = async (id) => {
    try {
      const res = await getModuleById(id);
      setEditingModule(res.data.data);
      setFormData(res.data.data);
      setShowModal(true);
    } catch (err) {
      toast.error("Failed to fetch module");
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await deleteModule(id);
        toast.success("Module deleted successfully");
        fetchModules();
      } catch (err) {
        toast.error("Failed to delete module");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Modules Management</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Module
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Theory Hours</th>
            <th>Practical Hours</th>
            <th>Staff (Router)</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.length > 0 ? (
            modules.map((mod) => {
              const staffName =
                staff.find((s) => s.id === mod.moduleRouterId)?.fullName || "N/A";
              const subjectTitles =
                subjects
                  .filter((sub) => mod.subjectIds?.includes(sub.id))
                  .map((sub) => sub.title)
                  .join(", ") || "N/A";

              return (
                <tr key={mod.id}>
                  <td>{mod.id}</td>
                  <td>{mod.title}</td>
                  <td>{mod.description}</td>
                  <td>{mod.theoryHours}</td>
                  <td>{mod.practicalHours}</td>
                  <td>{staffName}</td>
                  <td>{subjectTitles}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(mod.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(mod.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No modules available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingModule ? "Edit Module" : "Add Module"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTheoryHours" className="mb-3">
              <Form.Label>Theory Hours</Form.Label>
              <Form.Control
                type="number"
                name="theoryHours"
                value={formData.theoryHours}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPracticalHours" className="mb-3">
              <Form.Label>Practical Hours</Form.Label>
              <Form.Control
                type="number"
                name="practicalHours"
                value={formData.practicalHours}
                onChange={handleChange}
              />
            </Form.Group>

            
            <Form.Group controlId="formStaff" className="mb-3">
              <Form.Label>Assign Staff (Router)</Form.Label>
              <Form.Select
                name="moduleRouterId"
                value={formData.moduleRouterId || ""}
                onChange={handleChange}
              >
                <option value="">-- Select Staff --</option>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

           
            <Form.Group controlId="formSubjects" className="mb-3">
              <Form.Label>Assign Subjects</Form.Label>
              <Form.Select
                multiple
                value={formData.subjectIds || []}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subjectIds: Array.from(
                      e.target.selectedOptions,
                      (option) => Number(option.value)
                    ),
                  })
                }
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit">
              {editingModule ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Modules;