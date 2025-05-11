import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      alert(res.data.message || '✅ Login successful');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Login failed');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-md animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
