import React, { useState, useEffect } from "react";

export default function TopicForm({ initialData, sections, onSubmit }) {
  const [name, setName] = useState("");
  const [sectionId, setSectionId] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSectionId(initialData.sectionId || "");
    }
  }, [initialData]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, sectionId: parseInt(sectionId) }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Topic Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Section</label>
        <select
          className="form-select"
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          required
        >
          <option value="">Select Section</option>
          {sections.map((sec) => (
            <option key={sec.id} value={sec.id}>
              {sec.name} 
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-success">
        {initialData ? "Update Topic" : "Add Topic"}
      </button>
    </form>
  );
}
