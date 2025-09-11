// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authApi";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const role = user?.role;
  const name = user?.fullName;

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Logsheet</span>
        {user && (
          <span className="welcome">Welcome {name} ({role})</span>
        )}
      </div>
      
      {user && (
        <ul className="navbar-menu">
          
          {/* ==================== STAFF MENU ==================== */}
          {role === "Staff" && (
            <li className="dropdown">
              <button className="dropbtn">LogSheet Management ▼</button>
              <div className="dropdown-content">
                <a href="/add-log">Add Log</a>
              </div>
            </li>
          )}

          {/* ============= COURSE COORDINATOR (Coco) MENU ============= */}
          {role === "Coco" && (
            <>
              <li className="dropdown">
                <button className="dropbtn">LogSheet Management ▼</button>
                <div className="dropdown-content">
                  <a href="/add-log">Add Log</a>
                  <a href="/verify-logs">Verify Logs</a>
                </div>
              </li>
              
              <li className="dropdown">
                <button className="dropbtn">Report Management ▼</button>
                <div className="dropdown-content">
                  <a href="/module-progress-report">Module Progress Report</a>
                  <a href="/course-progress-report">Course Progress Report</a>
                </div>
              </li>
            </>
          )}

          {/* ==================== ADMIN MENU ==================== */}
          {role === "Admin" && (
            <>
              {/* Course Management */}
              <li className="dropdown">
                <button className="dropbtn">Course Management ▼</button>
                <div className="dropdown-content">
                  <a href="/add-batch-cycle">Add Batch Cycle</a>
                  <a href="/add-premises">Add Premises</a>
                  <a href="/add-course-types">Add Course Types</a>
                  <a href="/add-course">Add Course</a>
                </div>
              </li>

              {/* Course Module Management */}
              <li className="dropdown">
                <button className="dropbtn">Course Module Management ▼</button>
                <div className="dropdown-content">
                  <a href="/add-subject">Add Subject</a>
                  <a href="/add-section">Add Section</a>
                  <a href="/add-topic">Add Topic</a>
                  <a href="/add-module">Add Module</a>
                </div>
              </li>

              {/* Course Group Management */}
              <li className="dropdown">
                <button className="dropbtn">Course Group Management ▼</button>
                <div className="dropdown-content">
                  <a href="/add-group">Add Group</a>
                  <a href="/add-course-group">Add Course Group</a>
                </div>
              </li>

              {/* Report Management */}
              <li className="dropdown">
                <button className="dropbtn">Report Management ▼</button>
                <div className="dropdown-content">
                  <a href="/module-progress-report">Module Progress Report</a>
                  <a href="/course-progress-report">Course Progress Report</a>
                </div>
              </li>

              {/* User Management */}
              <li className="dropdown">
                <button className="dropbtn">User Management ▼</button>
                <div className="dropdown-content">
                  <a href="/add-menu-items">Add Menu Items</a>
                  <a href="/add-role">Add Role</a>
                  <a href="/add-staff">Add Staff</a>
                </div>
              </li>

              {/* Course Administration */}
              <li className="dropdown">
                <button className="dropbtn">Course Administration ▼</button>
                <div className="dropdown-content">
                  <a href="/assign-course-coordinator">Assign Course-Coordinator</a>
                </div>
              </li>

              {/* LogSheet Management */}
              <li className="dropdown">
                <button className="dropbtn">LogSheet Management ▼</button>
                <div className="dropdown-content">
                  <a href="/add-log-sheet-types">Add LogSheet Types</a>
                  <a href="/add-log">Add Log</a>
                  <a href="/verify-logs">Verify Logs</a>
                  <a href="/approve-logs">Approve Logs</a>
                </div>
              </li>
            </>
          )}

        </ul>
      )}

      <div className="navbar-user">
        {user ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
