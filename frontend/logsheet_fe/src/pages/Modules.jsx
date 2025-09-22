import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import {
  getAllModules,
  getModuleById,
  addModule,
  updateModule,
  deleteModule,
} from "../services/modulesService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Modules = () => {
  const [modules, setModules] = useState([]);
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

  // Fetch all modules
  const fetchModules = async () => {
    try {
      const res = await getAllModules();
      setModules(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch modules");
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Add / Update)
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

  // Edit button clicked
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

  // Delete module
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
            <th style={{ width: "200px" }}>ID</th>
            <th style={{ width: "500px" }}>Title</th>
            <th style={{ width: "500px" }}>Description</th>
            <th style={{ width: "200px" }}>Theory Hours</th>
            <th style={{ width: "200px" }}>Practical Hours</th>
            <th style={{ width: "200px" }}>Router ID</th>
            <th style={{ width: "200px" }}>Subject IDs</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.length > 0 ? (
            modules.map((mod) => (
              <tr key={mod.id}>
                <td>{mod.id}</td>
                <td>{mod.title}</td>
                <td>{mod.description}</td>
                <td>{mod.theoryHours}</td>
                <td>{mod.practicalHours}</td>
                <td>{mod.moduleRouterId}</td>
                <td>{mod.subjectIds ? mod.subjectIds.join(", ") : ""}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No modules available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
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

            <Form.Group controlId="formModuleRouterId" className="mb-3">
              <Form.Label>Module Router ID</Form.Label>
              <Form.Control
                type="number"
                name="moduleRouterId"
                value={formData.moduleRouterId || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSubjectIds" className="mb-3">
              <Form.Label>Subject IDs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="subjectIds"
                value={formData.subjectIds.join(",")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subjectIds: e.target.value
                      .split(",")
                      .map((id) => id.trim())
                      .filter((id) => id !== "")
                      .map(Number),
                  })
                }
              />
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









 // src/components/Modules.jsx
// import React, { useEffect, useState } from "react";
// import { Modal, Button, Table, Form } from "react-bootstrap";
// import {
//   getAllModules,
//   getModuleById,
//   addModule,
//   updateModule,
//   deleteModule,
// } from "../services/modulesService";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Modules = () => {
//   const [modules, setModules] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     theoryHours: "",
//     practicalHours: "",
//     moduleRouterId: "",
//   });
//   const [editingModule, setEditingModule] = useState(null);

//   // Fetch all modules
//   const fetchModules = async () => {
//     try {
//       const res = await getAllModules();
//       setModules(res.data.data); // backend returns ApiResponse { message, status, data }
//     } catch (err) {
//       toast.error("Failed to fetch modules");
//     }
//   };

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Open Add Modal
//   const handleAdd = () => {
//     setEditingModule(null);
//     setFormData({
//       title: "",
//       description: "",
//       theoryHours: "",
//       practicalHours: "",
//       moduleRouterId: "",
//     });
//     setShowModal(true);
//   };

//   // Open Edit Modal
//   const handleEdit = async (id) => {
//     try {
//       const res = await getModuleById(id);
//       setEditingModule(res.data.data || res.data); // depending on ApiResponse
//       setFormData(res.data.data || res.data);
//       setShowModal(true);
//     } catch (err) {
//       toast.error("Failed to fetch module");
//     }
//   };

//   // Save (Add or Update)
//   const handleSave = async () => {
//     try {
//       if (editingModule) {
//         await updateModule(editingModule.id, formData);
//         toast.success("Module updated successfully");
//       } else {
//         await addModule(formData);
//         toast.success("Module added successfully");
//       }
//       setShowModal(false);
//       fetchModules();
//     } catch (err) {
//       toast.error("Failed to save module");
//     }
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this module?")) return;
//     try {
//       await deleteModule(id);
//       toast.success("Module deleted successfully");
//       fetchModules();
//     } catch (err) {
//       toast.error("Failed to delete module");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Modules Management</h2>
//       <Button variant="primary" onClick={handleAdd} className="mb-3">
//         + Add Module
//       </Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Theory Hours</th>
//             <th>Practical Hours</th>
//             <th>Router Id</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {modules.length > 0 ? (
//             modules.map((mod, index) => (
//               <tr key={mod.id}>
//                 <td>{index + 1}</td>
//                 <td>{mod.title}</td>
//                 <td>{mod.description}</td>
//                 <td>{mod.theoryHours}</td>
//                 <td>{mod.practicalHours}</td>
//                 <td>{mod.moduleRouterId}</td>
//                 <td>
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     onClick={() => handleEdit(mod.id)}
//                     className="me-2"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(mod.id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No modules available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingModule ? "Edit Module" : "Add Module"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="title" className="mb-2">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="description" className="mb-2">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="theoryHours" className="mb-2">
//               <Form.Label>Theory Hours</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="theoryHours"
//                 value={formData.theoryHours}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="practicalHours" className="mb-2">
//               <Form.Label>Practical Hours</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="practicalHours"
//                 value={formData.practicalHours}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="moduleRouterId" className="mb-2">
//               <Form.Label>Module Router ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="moduleRouterId"
//                 value={formData.moduleRouterId}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Modules;
