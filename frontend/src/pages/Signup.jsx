import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../lib/api";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(formData);
      // On success, redirect to login so they can sign in with new credentials
      alert("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              name="phone"
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm">{error}</div>}

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}