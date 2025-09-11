// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Auth utilities
import { isAuthenticated } from "./services/authApi";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
};

// Home Component
const Home = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to Logsheet Management</h1>
      
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={<PublicRoute><Login /></PublicRoute>} 
          />
          <Route 
            path="/register" 
            element={<PublicRoute><Register /></PublicRoute>} 
          />
          <Route 
            path="/forgot-password" 
            element={<PublicRoute><ForgotPassword /></PublicRoute>} 
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={<ProtectedRoute><Home /></ProtectedRoute>} 
          />
          
          {/* Future routes */}
          <Route 
            path="/add-log" 
            element={<ProtectedRoute><div style={{padding: "20px"}}>Add Log Page - Coming Soon</div></ProtectedRoute>} 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;
