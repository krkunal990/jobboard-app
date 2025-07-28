import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axios";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "applicant" || user?.role === "recruiter") {
      api
        .get("applications/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        })
        .then((res) => setApplications(res.data.results || []))
        .catch((err) => console.error("Failed to fetch applications", err));
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "recruiter") {
      api
        .get("jobs/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        })
        .then((res) => setJobs(res.data.results || []))
        .catch((err) => console.error("Failed to fetch jobs", err));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const containerClass = darkMode
    ? "bg-gray-900 text-white min-h-screen transition duration-300 ease-in-out"
    : "bg-[#FAF9F6] text-gray-800 min-h-screen transition duration-300 ease-in-out";

  const cardClass = darkMode
    ? "rounded-lg shadow-md p-6 border border-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out bg-gray-800"
    : "rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 ease-in-out bg-white";

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center px-6 py-5 shadow-sm">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded text-sm font-medium border shadow bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-white hover:bg-indigo-200 dark:hover:bg-indigo-700"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded text-sm font-medium border shadow bg-red-100 text-red-700 dark:bg-red-800 dark:text-white hover:bg-red-200 dark:hover:bg-red-700"
          >
            🔓 Logout
          </button>
        </div>
      </div>

      {user?.role === "recruiter" && (
        <div className="mb-6 px-6 mt-4">
          <Link
            to="/jobs/create"
            className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            ➕ Post a Job
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        {user?.role === "applicant" && (
          <Link to="/jobs" className={`${cardClass} text-center`}>
            <h2 className="text-lg font-semibold">🔍 View All Jobs</h2>
          </Link>
        )}

        {user?.role === "applicant" && (
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4">📄 My Applications</h2>
            {applications.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-300">No applications yet.</p>
            ) : (
              <ul className="space-y-3">
                {applications.map((app) => (
                  <li key={app.id} className="bg-gray-100 dark:bg-gray-700 rounded p-3">
                    <div className="font-medium">{app.job_title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      Submitted: {new Date(app.created_at).toLocaleDateString()}
                    </div>
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      View Resume
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {user?.role === "recruiter" && (
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4">📬 Applications to My Jobs</h2>
            {applications.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-300">No applications yet.</p>
            ) : (
              <ul className="space-y-3">
                {applications.map((app) => (
                  <li key={app.id} className="bg-gray-100 bg-[#FFF8E7] rounded p-3">
                    <div className="font-medium">
                      {app.applicant_username} applied to {app.job_title}
                    </div>
                    <div className="text-sm text-black-500 dark:text-black-300">
                      Submitted: {new Date(app.created_at).toLocaleDateString()}
                    </div>
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      View Resume
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {user?.role === "recruiter" && (
          <div className={cardClass}>
            <h2 className="text-xl font-semibold mb-4">📌 My Posted Jobs</h2>
            {jobs.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-300">No jobs posted yet.</p>
            ) : (
              <ul className="space-y-3">
                {jobs.map((job) => (
                  <li key={job.id} className="bg-gray-100 dark:bg-[#FFF8E7] rounded p-3">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-gray-500 dark:black-gray-300">
                      Posted: {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {user?.role === "recruiter" && (
        <div className="px-6 py-4 mt-10">
          <h3 className="text-md font-medium mb-2">✨ Suggestions</h3>
          <ul className="text-sm list-disc pl-6 text-gray-500 dark:text-gray-400">
            <li>Add resume download counts</li>
            <li>View applications per job</li>
            <li>Filter by status or date</li>
            <li>Add pagination or export options</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
