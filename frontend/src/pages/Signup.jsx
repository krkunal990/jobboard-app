import React, { useState } from "react";
import api from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("accounts/signup/", form);
      alert("Account created! You can now log in.");
      window.location.href = "/";
    } catch (err) {
      setError("Signup failed. Please check your input or try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Sign Up</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <input
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Role */}
          <div className="relative">
            <select
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* Submit */}
          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-green-600 font-medium hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
