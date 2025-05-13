import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/dashboard';

  return (
    <AuthProvider>
      {!hideNav && (
        <nav className="flex gap-6 p-4 bg-white shadow-md text-sm font-medium text-gray-800 font-sans">
          <Link to="/" className="hover:text-blue-600 hover:underline transition">Home</Link>
          <Link to="/login" className="hover:text-blue-600 hover:underline transition">Login</Link>
          <Link to="/register" className="hover:text-blue-600 hover:underline transition">Register</Link>
        </nav>
      )}
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center animate-fade-in text-white font-sans">
              <h1 className="text-4xl font-bold mb-4 drop-shadow">Welcome to Your Certificates Vault</h1>
              <p className="mb-6 text-white/90 text-base">One platform. All your certificates. Store them safely. Access them anytime.</p>
              <div className="flex justify-center gap-4 mt-4">
                <Link to="/register" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold shadow hover:bg-purple-100 transition-all hover:scale-105">Register Now</Link>
                <Link to="/login" className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all hover:scale-105">Login</Link>
              </div>
            </div>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}