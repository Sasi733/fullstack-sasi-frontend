import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://sasi-login-backend-1.onrender.com/api/auth/register', form);
      alert(res.data.message || '✅ Registered successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Registration failed');
    }
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://i.postimg.cc/cL7Pz5Kd/Screenshot-2025-05-12-224024.png')`,
        backgroundColor: '#000',
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Register form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/20 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-md animate-fade-in text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {['email', 'phone', 'password'].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={`Enter ${field}`}
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
