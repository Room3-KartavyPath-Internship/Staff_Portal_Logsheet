import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { SubjectsContext } from "../contexts/SubjectsContext";
import { getSections, addSection, updateSection, deleteSection } from "../services/sectionApi";

export default function SectionPage() {
    const { subjects } = useContext(SubjectsContext);
    const [sections, setSections] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [editingId, setEditingId] = useState(null);

    const fetchSections = async () => {
        try {
            const res = await getSections();
            setSections(res.data);
        } catch (err) {
            toast.error("Failed to load sections");
        }
    };

    useEffect(() => { fetchSections(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, subjectId: parseInt(subjectId) };

        try {
            if (editingId) {
                await updateSection(editingId, payload);
                toast.success("Section updated successfully");
            } else {
                await addSection(payload);
                toast.success("Section added successfully");
            }

            closeModal();
            await fetchSections();
        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    const handleEdit = (section) => {
        setName(section.name);
        setSubjectId(section.subjectId);
        setEditingId(section.id);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this section?")) {
            try {
                await deleteSection(id);
                toast.success("Section deleted successfully");
                await fetchSections();
            } catch (error) {
                console.error(error);
                toast.error("Delete failed");
            }
        }
    };

    const openModal = () => {
        setName('');
        setSubjectId('');
        setEditingId(null);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setName('');
        setSubjectId('');
        setEditingId(null);
    };

    return (
        <div className="container mt-4">
            <h2>Sections</h2>
            <button className="btn btn-primary mb-3" onClick={openModal}>Add Section</button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Section Name</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map(sec => (
                        <tr key={sec.id}>
                            <td>{sec.id}</td>
                            <td>{sec.name}</td>
                            <td>{subjects.find(sub => sub.id === sec.subjectId)?.title || 'N/A'}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(sec)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(sec.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingId ? "Edit Section" : "Add Section"}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Section Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Subject</label>
                                        <select
                                            className="form-select"
                                            value={subjectId}
                                            onChange={e => setSubjectId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.map(sub => (
                                                <option key={sub.id} value={sub.id}>{sub.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
