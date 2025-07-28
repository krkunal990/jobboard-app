import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`jobs/${id}/`).then((res) => setJob(res.data));
  }, [id]);

  const handleApply = async () => {
    if (!resume) return alert("Please upload your resume");

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await api.post(`jobs/${id}/apply/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setMessage("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting application.");
    }
  };

  if (!job) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-700">{job.description}</p>
      <p className="text-sm mt-2 text-gray-500">Location: {job.location}</p>

      <div className="mt-4">
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Now
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default JobDetail;
