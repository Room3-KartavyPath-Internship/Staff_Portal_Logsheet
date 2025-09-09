import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BatchCycleList from "./components/BatchCycleList";

import BatchCycleDetails from "./components/BatchCycleDetails";


// import Home from "./components/Home";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
import BatchCycleUpdate from "./components/BatchCycleUpdate";

import BatchCycle from "./components/BatchCycle";
// import DashboardLayout from "./components/DashboardLayout ";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* <header style={{ marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Batch Cycles Admin</h1>
        <nav>
          <Link to="/batch-cycles" style={{ marginRight: 8 }}>List</Link>
          <Link to="/batch-cycles/new">Create</Link>
        </nav>
      </header> */}

      <Routes>
        {/* <Route path="/" element={<BatchCycleForm />} /> */}
        {/* <Route path="/home" element={<Home />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/batch-cycles/new" element={<BatchCycle />} />
        {/* <Route path="/dashboard" element={<DashboardLayout />} /> */}
         {/* <Route path="/batch-cycles-form" element={<BatchCycleForm />} /> */}
        <Route path="/batch-cycles" element={<BatchCycleList />} />
       
        {/* <Route path="/batch-cycles-details" element={<BatchCycleDetails />} /> */}
       {/* // <Route path="/batch-cycles/:id/edit" element={<BatchCycleForm />} /> */}
        <Route path="/batch-cycles/:id" element={<BatchCycleDetails />} />
        <Route path="/batch-cycles/update/:id" element={<BatchCycleUpdate />} />
        
      </Routes>
    </div>
  );
}
