// import React, { useState, useEffect } from "react";

// export default function TopicForm({ initialData, onSubmit }) {
//   const [name, setName] = useState("");
//   const [sectionId, setSectionId] = useState("");

//   useEffect(() => {
//     if (initialData) {
//       setName(initialData.name || "");
//       setSectionId(initialData.sectionId || "");
//     } else {
//       setName("");
//       setSectionId("");
//     }
//   }, [initialData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ name, sectionId });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label>Topic Name</label>
//         <input
//           type="text"
//           className="form-control"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <div className="mb-3">
//         <label>Section ID</label>
//         <input
//           type="text"
//           className="form-control"
//           value={sectionId}
//           onChange={(e) => setSectionId(e.target.value)}
//         />
//       </div>
//       <button type="submit" className="btn btn-success">
//         {initialData ? "Update Topic" : "Add Topic"}
//       </button>
//     </form>
//   );
// }



import React, { useState, useEffect } from "react";

export default function TopicForm({ initialData, onSubmit }) {
  const [name, setName] = useState("");
  const [sectionId, setSectionId] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSectionId(initialData.sectionId || "");
    } else {
      setName("");
      setSectionId("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, sectionId });
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
        />
      </div>
      <div className="mb-3">
        <label>Section ID</label>
        <input
          type="text"
          className="form-control"
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success">
        {initialData ? "Update Topic" : "Add Topic"}
      </button>
    </form>
  );
}
