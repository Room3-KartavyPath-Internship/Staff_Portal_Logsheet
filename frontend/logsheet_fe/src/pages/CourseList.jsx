import React, { useState, useEffect } from "react";
import {
  getAllCourses,
  deleteCourse,
  getBatchCycles,
  getPremises,
  getCourseTypes,
} from "../services/CourseService"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [batchCycles, setBatchCycles] = useState([]);
  const [premises, setPremises] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const navigate = useNavigate();

 
  const loadCourses = async () => {
    try {
      const res = await getAllCourses();
      setCourses(res.data.data); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to load courses");
    }
  };

  
  useEffect(() => {
    loadCourses();

    getBatchCycles()
      .then((res) => {
        
        setBatchCycles(res.data);
      })
      .catch(() => toast.error("Failed to load batch cycles"));

    getPremises()
      .then((res) => {
      
        setPremises(res.data);
      })
      .catch(() => toast.error("Failed to load premises"));

    getCourseTypes()
      .then((res) => {
        const types = Array.isArray(res.data) ? res.data : res.data?.data || [];
       
        setCourseTypes(types);
      })
      .catch(() => toast.error("Failed to load course types"));
  }, []);

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        toast.success("Course deleted successfully!");
        loadCourses();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete course");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Course List</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/courses/add")}
      >
        Add Course
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Batch Cycle</th>
            <th>Premises</th>
            <th>Course Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.startDate}</td>
              <td>{course.endDate}</td>
              <td>
                {batchCycles.find((b) => b.id === course.batchCycleId)?.title ||
                  "-"}
              </td>
              <td>
                {premises.find((p) => p.id === course.premiseId)?.title || "-"}
              </td>
              <td>
                {courseTypes.find(
                  (ct) => ct.courseTypeId === course.courseTypeId
                )?.title || "-"}
              </td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/courses/edit/${course.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;






