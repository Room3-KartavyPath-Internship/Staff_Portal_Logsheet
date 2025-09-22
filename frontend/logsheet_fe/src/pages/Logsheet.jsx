import React, { useState, useEffect } from "react";
import {
  getAllLogsheets,
  addLogsheet,
  updateLogsheet,
  deleteLogsheet,
  getAllCourses,
  getAllModules,
  getAllTopics,
  getAllStaffs,
  getAllLogsheetTypes,
  getAllGroups,
} from "../services/logsheetService";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

function Logsheet() {
  const [logsheets, setLogsheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    logDate: "",
    entryType: "",
    status: "",
    description: "",
    courseId: "",
    moduleId: "",
    topicId: "",
    staffId: "",
    logsheetTypeId: "",
    groupId: "",
  });

  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [logsheetTypes, setLogsheetTypes] = useState([]);
  const [groups, setGroups] = useState([]);

  const [topicRequired, setTopicRequired] = useState(false);
  const [groupRequired, setGroupRequired] = useState(false);

  const fetchLogsheets = async () => {
    setLoading(true);
    try {
      const res = await getAllLogsheets();
      setLogsheets(res.data || []);
    } catch (err) {
      toast.error("Error fetching logsheets");
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [c, m, t, s, l, g] = await Promise.all([
        getAllCourses(),
        getAllModules(),
        getAllTopics(),
        getAllStaffs(),
        getAllLogsheetTypes(),
        getAllGroups(),
      ]);
      setCourses(c.data || []);
      setModules(m.data || []);
      setTopics(t || []);
      setStaffs(s || []);
      setLogsheetTypes(l.data || []);
      setGroups(g.data || []);
    } catch (err) {
      toast.error("Error loading dropdowns");
    }
  };

  useEffect(() => {
    fetchLogsheets();
    fetchDropdowns();
  }, []);

const handleShowModal = (logsheet = null) => {
  if (logsheet) {
    setIsEditing(true);
    setFormData({
      id: logsheet.id,
      logDate: logsheet.logDate
        ? logsheet.logDate.split("T")[0]
        : "",
      entryType: logsheet.entryType || "",
      status: logsheet.status || "",
      description: logsheet.description || "",
      courseId: logsheet.courseId || logsheet.course?.id || "",
      moduleId: logsheet.moduleId || logsheet.module?.id || "",
      topicId: logsheet.topicId || logsheet.topic?.id || "",
      staffId: logsheet.staffId || logsheet.staff?.id || "",
      logsheetTypeId:
        logsheet.logsheetTypeId || logsheet.logsheetType?.id || "",
      groupId: logsheet.groupId || logsheet.group?.id || "",
    });

    const selectedType = logsheetTypes.find(
      (lt) => lt.id === (logsheet.logsheetTypeId || logsheet.logsheetType?.id)
    );
    setTopicRequired(selectedType?.topicRequired || false);
    setGroupRequired(selectedType?.groupRequired || false);
  } else {
    setIsEditing(false);
    setFormData({
      id: null,
      logDate: "",
      entryType: "",
      status: "",
      description: "",
      courseId: "",
      moduleId: "",
      topicId: "",
      staffId: "",
      logsheetTypeId: "",
      groupId: "",
    });
    setTopicRequired(false);
    setGroupRequired(false);
  }
  setShowModal(true);
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "logsheetTypeId") {
      const selectedType = logsheetTypes.find(
        (lt) => lt.id === parseInt(value)
      );
      setTopicRequired(selectedType?.topicRequired || false);
      setGroupRequired(selectedType?.groupRequired || false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateLogsheet(formData.id, formData);
        toast.success("Logsheet updated successfully");
      } else {
        await addLogsheet(formData);
        toast.success("Logsheet added successfully");
      }
      fetchLogsheets();
      setShowModal(false);
    } catch (err) {
      toast.error("Error saving logsheet");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this logsheet?")) {
      try {
        await deleteLogsheet(id);
        toast.success("Logsheet deleted successfully");
        fetchLogsheets();
      } catch (err) {
        toast.error("Error deleting logsheet");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Logsheets</h2>
      <Button className="mb-3" onClick={() => handleShowModal()}>
        + Add Logsheet
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Entry Type</th>
              <th>Status</th>
              <th>Course</th>
              <th>Module</th>
              <th>Topic</th>
              <th>Staff</th>
              <th>Logsheet Type</th>
              <th>Group</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logsheets.map((ls) => (
              <tr key={ls.id}>
                <td>{ls.id}</td>
                <td>{ls.logDate?.split("T")[0]}</td>
                <td>{ls.entryType}</td>
                <td>{ls.status}</td>
                <td>{courses.find((c) => c.id === ls.courseId)?.name || ""}</td>
                <td>{modules.find((m) => m.id === ls.moduleId)?.title || ""}</td>
                <td>{topics.find((t) => t.id === ls.topicId)?.name || ""}</td>
                <td>{staffs.find((s) => s.id === ls.staffId)?.fullName || ""}</td>
                <td>
                  {logsheetTypes.find((l) => l.id === ls.logsheetTypeId)?.title ||
                    ""}
                </td>
                <td>{groups.find((g) => g.id === ls.groupId)?.name || ""}</td>
                <td>{ls.description}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(ls)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(ls.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Logsheet" : "Add Logsheet"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="logDate"
                value={formData.logDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Entry Type</Form.Label>
              <Form.Select
                name="entryType"
                value={formData.entryType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Theory">Theory</option>
                <option value="Lab">Lab</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="New">New</option>
                <option value="Verified">Verified</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Module</Form.Label>
              <Form.Select
                name="moduleId"
                value={formData.moduleId}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Logsheet Type</Form.Label>
              <Form.Select
                name="logsheetTypeId"
                value={formData.logsheetTypeId}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {logsheetTypes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            
            {topicRequired && (
              <Form.Group className="mb-2">
                <Form.Label>Topic</Form.Label>
                <Form.Select
                  name="topicId"
                  value={formData.topicId}
                  onChange={handleChange}
                  required={topicRequired}
                >
                  <option value="">Select</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-2">
              <Form.Label>Staff</Form.Label>
              <Form.Select
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {staffs.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            {groupRequired && (
              <Form.Group className="mb-2">
                <Form.Label>Group</Form.Label>
                <Form.Select
                  name="groupId"
                  value={formData.groupId}
                  onChange={handleChange}
                  required={groupRequired}
                >
                  <option value="">Select</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

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
    </div>
  );
}

export default Logsheet;
