// src/pages/JobCreate.jsx
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const JobCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("jobs/", form); // this hits the backend correctly
      alert("Job created!");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      setError("Failed to create job. Make sure you're logged in as a recruiter.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Job Title"
          className="w-full border p-2"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          className="w-full border p-2"
          value={form.location}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full border p-2 h-32"
          value={form.description}
          onChange={handleChange}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobCreate;
