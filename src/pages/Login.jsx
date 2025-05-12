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
      const res = await axios.post('https://sasi-login-backend-1.onrender.com/api/auth/login', form);
      alert(res.data.message || '✅ Login successful');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', form.email);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Login failed');
      console.error(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://i.postimg.cc/LsBgSdYs/Screenshot-2025-05-12-220631.png')`,
      }}
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-[#2c2738d9] shadow-xl p-10 rounded-2xl w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
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
          <label className="block mb-1">Password</label>
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
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
