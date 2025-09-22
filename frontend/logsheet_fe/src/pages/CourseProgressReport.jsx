
// src/components/CourseProgressReport.jsx
import React, { useState } from "react";
import { getCourseProgressReport } from "../services/courseProgressReportService";
import { Button, Form, Table, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const CourseProgressReport = () => {
  const [courseName, setCourseName] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchReport = async (e) => {
    e.preventDefault();
    if (!courseName.trim()) {
      toast.warning("Please enter a course name");
      return;
    }
    setLoading(true);
    try {
      const res = await getCourseProgressReport(courseName);
      if (res.data.success) {
        setReports(res.data.data || []);
        toast.success(res.data.message || "Report fetched successfully");
      } else {
        toast.error(res.data.message || "Failed to fetch report");
      }
    } catch (err) {
      toast.error("Error fetching report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">📊 Course Progress Report</h2>

      {/* Search Form */}
      <Form className="d-flex justify-content-center mb-4" onSubmit={handleFetchReport}>
        <Form.Control
          type="text"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={{ maxWidth: "300px" }}
          className="me-2"
        />
        <Button type="submit" variant="btn btn-success" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Generate"}
        </Button>
      </Form>

      {/* Results Table */}
      {reports.length > 0 && (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th style={{ width: "200px" }}>Course Name</th>
              <th style={{ width: "200px" }}>Module Title</th>
              <th style={{ width: "200px" }}>Course Start Date</th>
              <th style={{ width: "200px" }}>Course End Date</th>
              <th style={{ width: "200px" }}>Theory Hours</th>
              <th style={{ width: "200px" }}>Practical Hours</th>
              <th style={{ width: "200px" }}>Total Hours</th>
              <th style={{ width: "200px" }}>Faculty Name</th>
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
      )}

      {reports.length === 0 && !loading && (
        <p className="text-muted text-center">
          No reports found. Please search by course name.
        </p>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default CourseProgressReport;
