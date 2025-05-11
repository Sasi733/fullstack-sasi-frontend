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
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-md animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

        {['email', 'phone', 'password'].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block text-white mb-1 capitalize">{field}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              placeholder={`Enter ${field}`}
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
