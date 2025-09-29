import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { SubjectsContext } from "../contexts/SubjectsContext";
import { addSubject, updateSubject, deleteSubject } from "../services/subjectApi";

export default function SubjectPage() {
    const { subjects, fetchSubjects } = useContext(SubjectsContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { title: name };

        try {
            if (editingId) {
                await updateSubject(editingId, payload);
                toast.success("Subject updated successfully");
            } else {
                await addSubject(payload);
                toast.success("Subject added successfully");
            }

            closeModal();
            await fetchSubjects(); 
        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    const handleEdit = (subject) => {
        setName(subject.title);
        setEditingId(subject.id);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            try {
                await deleteSubject(id);
                toast.success("Subject deleted successfully");
                await fetchSubjects();
            } catch (error) {
                console.error(error);
                toast.error("Delete failed");
            }
        }
    };

    const openModal = () => {
        setName('');
        setEditingId(null);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setName('');
        setEditingId(null);
    };

    return (
        <div className="container mt-4">
            <h2>Subjects</h2>
            <button className="btn btn-primary mb-3" onClick={openModal}>Add Subject</button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(sub => (
                        <tr key={sub.id}>
                            <td>{sub.id}</td>
                            <td>{sub.title}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(sub)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(sub.id)}>Delete</button>
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
                                <h5 className="modal-title">{editingId ? "Edit Subject" : "Add Subject"}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Subject Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                        />
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
