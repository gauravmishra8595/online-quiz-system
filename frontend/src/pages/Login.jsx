import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      navigate("/categories");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
        >
          Login
        </button>

        <p className="text-sm mt-3 text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
