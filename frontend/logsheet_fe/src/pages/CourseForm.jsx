import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCourse,
  updateCourse,
  getBatchCycles,
  getPremises,
  getCourseTypes,
  getCourseById,
} from "../services/CourseService";   

const CourseForm = () => {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    batchCycleId: "",
    premiseId: "",
    courseTypeId: "",
  });

  const [batchCycles, setBatchCycles] = useState([]);
  const [premises, setPremises] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBatchCycles()
      .then((res) => setBatchCycles(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error("Failed to load batch cycles"));

    getPremises()
      .then((res) => setPremises(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error("Failed to load premises"));

    getCourseTypes()
      .then((res) => {
        const types = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setCourseTypes(types);
      })
      .catch(() => toast.error("Failed to load course types"));

    if (id) {
      getCourseById(id)
        .then((res) => {
          const c = res.data.data || res.data;
          setCourse({
            name: c.name || "",
            description: c.description || "",
            startDate: c.startDate || "",
            endDate: c.endDate || "",
            batchCycleId: c.batchCycleId || "",
            premiseId: c.premiseId || "",
            courseTypeId: c.courseTypeId || "",
          });
        })
        .catch(() => toast.error("Failed to load course data"));
    }
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: id || null,
      name: course.name,
      description: course.description,
      startDate: course.startDate,
      endDate: course.endDate,
      batchCycleId: course.batchCycleId,
      premiseId: course.premiseId,
      courseTypeId: course.courseTypeId,
    };

    if (id) {
      updateCourse(id, payload)
        .then(() => {
          toast.success("Course updated successfully!");
          navigate("/courses");
        })
        .catch(() => toast.error("Failed to update course"));
    } else {
      addCourse(payload)
        .then(() => {
          toast.success("Course added successfully!");
          navigate("/courses");
        })
        .catch(() => toast.error("Failed to add course"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <div className="mb-3">
        <label>Course Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={course.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          value={course.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          className="form-control"
          value={course.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          className="form-control"
          value={course.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Batch Cycle</label>
        <select
          name="batchCycleId"
          className="form-control"
          value={course.batchCycleId}
          onChange={handleChange}
          required
        >
          <option value="">Select Batch Cycle</option>
          {batchCycles.map((b) =>
            b.id ? (
              <option key={b.id} value={b.id}>
                {b.title || b.name || b.id}
              </option>
            ) : null
          )}
        </select>
      </div>

      <div className="mb-3">
        <label>Premises</label>
        <select
          name="premiseId"
          className="form-control"
          value={course.premiseId}
          onChange={handleChange}
          required
        >
          <option value="">Select Premises</option>
          {premises.map((p) =>
            p.id ? (
              <option key={p.id} value={p.id}>
                {p.title || p.name || p.id}
              </option>
            ) : null
          )}
        </select>
      </div>

      <div className="mb-3">
        <label>Course Type</label>
        <select
          name="courseTypeId"
          className="form-control"
          value={course.courseTypeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((ct) =>
            ct.courseTypeId ? (
              <option key={ct.courseTypeId} value={ct.courseTypeId}>
                {ct.title || ct.name}
              </option>
            ) : null
          )}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {id ? "Update Course" : "Add Course"}
      </button>
    </form>
  );
};

export default CourseForm;

