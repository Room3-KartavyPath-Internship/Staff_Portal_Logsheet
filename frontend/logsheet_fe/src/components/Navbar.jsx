import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authApi";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  const user = getCurrentUser();
  const name = user?.fullName;
  const role = user?.role;
  const roleId = user?.roleId; // Should be available after login

  useEffect(() => {
    if (roleId) {
      axios
        .get(`/api/role-menu-permissions/allowed/${roleId}`)
        .then((res) => setMenuItems(res.data.data)) // Assumes response shape: { data: [...] }
        .catch(() => setMenuItems([]));
    }
  }, [roleId]);

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
          {menuItems.map((mi) => (
            <li key={mi.id}>
              <a href={mi.path}>{mi.title}</a>
            </li>
          ))}
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
