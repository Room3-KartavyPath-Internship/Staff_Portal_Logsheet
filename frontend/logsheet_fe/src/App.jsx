import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import BatchCycle from "./pages/BatchCycle";
import BatchCycleList from "./pages/BatchCycleList";
import BatchCycleDetails from "./pages/BatchCycleDetails";
import BatchCycleUpdate from "./pages/BatchCycleUpdate";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/batch-cycles/new" element={<BatchCycle />} />
        <Route path="/batch-cycles" element={<BatchCycleList />} />
        <Route path="/batch-cycles/:id" element={<BatchCycleDetails />} />
        <Route path="/batch-cycles/update/:id" element={<BatchCycleUpdate />} />
        
      </Routes>
    </Router>
  );
}

export default App;
