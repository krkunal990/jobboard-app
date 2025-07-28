import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import JobCreate from "./pages/JobCreate";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/create" element={<JobCreate />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
