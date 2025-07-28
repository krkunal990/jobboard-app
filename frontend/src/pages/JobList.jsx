import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

useEffect(() => {
  api.get("jobs/").then((res) => setJobs(res.data.results || []));
}, []);


  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Jobs</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.location}</p>
            <Link to={`/jobs/${job.id}`} className="text-blue-600 mt-2 block">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
