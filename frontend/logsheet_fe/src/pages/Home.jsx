import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      
      
      <div className="jumbotron bg-light p-5 rounded shadow-sm text-center">
        {user ? (
          <>
            <h1 className="display-4">Welcome, {user.name}!</h1>
            <p className="lead">
              Role: <strong>{user.role}</strong>
            </p>
            <hr className="my-4" />
            <p>Use the quick links above to navigate through your tabs.</p>
          </>
        ) : (
          <>
            <h1 className="display-5">Welcome to Logsheet Management System!</h1>
            <p className="lead text-muted">
              Please login to access your DashBoard.
            </p>
            <button 
              className="btn btn-primary btn-lg mt-3"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        )}
      </div>

      
      <div className="mt-5 p-4 bg-light rounded shadow-sm text-center">
        <p className="mb-0 text-muted">
          © 2025 Logsheet Management System. All rights reserved by Sunbeam.
        </p>
      </div>
    </div>
  );
}
