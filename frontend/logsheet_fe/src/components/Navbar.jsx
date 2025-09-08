import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Logsheet</div>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
