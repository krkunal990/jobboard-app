import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.username, form.password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid username or password.");
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-blue-100">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

      {error && (
        <div className="text-red-500 text-sm mb-4 text-center bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A4 4 0 018 17h8a4 4 0 012.879 1.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"
              />
            </svg>
          </span>
          <input
            className="w-full border rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0-6a4 4 0 014 4v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1a4 4 0 014-4z"
              />
            </svg>
          </span>
          <input
            type="password"
            className="w-full border rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Sign up link */}
      <p className="text-sm text-center mt-6 text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-medium hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  </div>
);
};

export default Login;
