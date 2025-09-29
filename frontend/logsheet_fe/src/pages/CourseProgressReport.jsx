
import React, { useState, useEffect } from "react";
import { getCourseProgressReport, getAllCourses } from "../services/courseProgressReportService";
import { Button, Table, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const CourseProgressReport = () => {
  const { courseName: paramCourseName } = useParams(); 
  const navigate = useNavigate(); 
  const [courseName, setCourseName] = useState(paramCourseName || "");
  const [courses, setCourses] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.data || []); 
      } catch (err) {
        toast.error("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  
  useEffect(() => {
    if (paramCourseName) {
      fetchReport(paramCourseName);
    }
  }, [paramCourseName]);

  const fetchReport = async (name) => {
    setLoading(true);
    try {
      const res = await getCourseProgressReport(name);
      if (res.data?.success) {
        setReports(res.data.data || []);
        toast.success(res.data.message || "Report fetched successfully");
      } else {
        setReports([]);
        toast.error(res.data?.message || "Failed to fetch report");
      }
    } catch (err) {
      setReports([]);
      toast.error("Error fetching report");
    } finally {
      setLoading(false);
    }
  };

 
  const handleFetchReport = (e) => {
    e.preventDefault();
    if (!courseName.trim()) {
      toast.warning("Please select a course");
      return;
    }
    
    navigate(`/reports/course-progress/${courseName}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">📊 Course Progress Report</h2>

      
      <form
        className="d-flex justify-content-center mb-4"
        onSubmit={handleFetchReport}
      >
        <select
          className="form-select me-2"
          style={{ maxWidth: "300px" }}
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>

        <Button type="submit" variant="success" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Generate"}
        </Button>
      </form>

      
      {reports.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Module Title</th>
              <th>Course Start Date</th>
              <th>Course End Date</th>
              <th>Theory Hours</th>
              <th>Practical Hours</th>
              <th>Total Hours</th>
              <th>Faculty Name</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{report.courseName}</td>
                <td>{report.moduleTitle}</td>
                <td>{report.courseStartDate}</td>
                <td>{report.courseEndDate}</td>
                <td>{report.theoryHours}</td>
                <td>{report.practicalHours}</td>
                <td>{report.totalHours}</td>
                <td>{report.facultyName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && (
          <p className="text-muted text-center">
            No reports found. Please select a course and generate report.
          </p>
        )
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default CourseProgressReport;
