



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createBatchCycle } from "../services/batchCycleApi";
// import "./BatchCycle.css";

// const BatchCycle = () => {
//   const navigate = useNavigate();

//   const [activeCycle, setActiveCycle] = useState("cycle1");
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [submitting, setSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const resp = await createBatchCycle(formData);
//       alert(resp?.message || "Batch Cycle Saved!");
//       navigate("/batch-cycles"); // ✅ redirect to list
//     } catch (err) {
//       alert(`Failed to save batch cycle: ${err.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="batch-container">
//       <h2>
//         <i className="fas fa-calendar-alt"></i> Batch Cycles
//       </h2>

//       {/* Tabs */}
//       <div className="tabs">
//         <button
//           className={activeCycle === "cycle1" ? "active" : ""}
//           onClick={() => setActiveCycle("cycle1")}
//         >
//           Cycle 1
//         </button>
//         <button
//           className={activeCycle === "cycle2" ? "active" : ""}
//           onClick={() => setActiveCycle("cycle2")}
//         >
//           Cycle 2
//         </button>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="batch-form">
//         <label>Cycle Title</label>
//         <div className="input-icon">
//           <i className="fas fa-heading"></i>
//           <input
//             type="text"
//             name="title"
//             placeholder={`Title for ${activeCycle}`}
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <label>Description</label>
//         <div className="input-icon">
//           <i className="fas fa-align-left"></i>
//           <textarea
//             name="description"
//             placeholder={`About ${activeCycle}...`}
//             value={formData.description}
//             onChange={handleInputChange}
//             rows="4"
//           />
//         </div>

//         <div className="date-fields">
//           <div>
//             <label>Start Date</label>
//             <div className="input-icon">
//               <i className="fas fa-calendar-day"></i>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label>End Date</label>
//             <div className="input-icon">
//               <i className="fas fa-calendar-day"></i>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <button type="submit" className="save-btn" disabled={submitting}>
//           <i className="fas fa-save"></i>{" "}
//           {submitting ? "Saving..." : "Save Batch Cycle"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BatchCycle;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBatchCycle } from "../services/batchCycleApi";

// ✅ Toastify imports
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./BatchCycle.css";

const BatchCycle = () => {
  const navigate = useNavigate();

  const [activeCycle, setActiveCycle] = useState("cycle1");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resp = await createBatchCycle(formData);
      toast.success(resp?.message || "Batch Cycle Saved!");
      navigate("/batch-cycles"); // ✅ redirect to list
    } catch (err) {
      toast.error(`Failed to save batch cycle: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="batch-container">
      <h2>
        <i className="fas fa-calendar-alt"></i> Batch Cycles
      </h2>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeCycle === "cycle1" ? "active" : ""}
          onClick={() => setActiveCycle("cycle1")}
        >
          Cycle 1
        </button>
        <button
          className={activeCycle === "cycle2" ? "active" : ""}
          onClick={() => setActiveCycle("cycle2")}
        >
          Cycle 2
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="batch-form">
        <label>Cycle Title</label>
        <div className="input-icon">
          <i className="fas fa-heading"></i>
          <input
            type="text"
            name="title"
            placeholder={`Title for ${activeCycle}`}
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <label>Description</label>
        <div className="input-icon">
          <i className="fas fa-align-left"></i>
          <textarea
            name="description"
            placeholder={`About ${activeCycle}...`}
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className="date-fields">
          <div>
            <label>Start Date</label>
            <div className="input-icon">
              <i className="fas fa-calendar-day"></i>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <label>End Date</label>
            <div className="input-icon">
              <i className="fas fa-calendar-day"></i>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="save-btn" disabled={submitting}>
          <i className="fas fa-save"></i>{" "}
          {submitting ? "Saving..." : "Save Batch Cycle"}
        </button>
      </form>

      {/* ✅ Toastify container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BatchCycle;
