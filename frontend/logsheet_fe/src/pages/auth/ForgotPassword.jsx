// src/pages/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await forgotPassword(email);
      toast.success("Password reset link sent! Check your email.");
      setSent(true);
    } catch (error) {
      const errorMessage = error.response?.data || "Failed to send reset link";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Reset Link Sent</h2>
          <div className="success-message">
            <p>A password reset link has been sent to your email address.</p>
            <p>Please check your email and follow the instructions to reset your password.</p>
          </div>
          <div className="auth-links">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <p className="form-description">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
          <div>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ForgotPassword;
