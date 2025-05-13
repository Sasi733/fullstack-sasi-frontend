import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRegister } from '../mockApi';

const Register = () => {
  const [form, setForm] = useState({ email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await mockRegister(form);
      alert(res.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-md animate-fade-in text-white">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <span>📝</span> Register
        </h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        {['email', 'phone', 'password'].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block mb-1 capitalize">{field}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">
                {field === 'email' ? '✉️' : field === 'phone' ? '📞' : '🔒'}
              </span>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'tel'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder={`Enter ${field}`}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>Register</span>
          <span>✅</span>
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;