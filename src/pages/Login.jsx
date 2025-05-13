// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://sasi-login-backend-3.onrender.com/api/auth/login', form);
      login(form.email, res.data.token);
      alert(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl shadow-2xl p-10 rounded-3xl w-full max-w-md text-white animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <span>🔐</span> Login
        </h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">✉️</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">🔒</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>Login</span>
          <span>➡️</span>
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
