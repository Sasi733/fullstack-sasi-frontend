import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <nav className="flex gap-6 p-4 bg-white shadow-md text-sm font-medium">
        <Link to="/" className="text-blue-600 hover:underline transition">Home</Link>
        <Link to="/login" className="text-blue-600 hover:underline transition">Login</Link>
        <Link to="/register" className="text-blue-600 hover:underline transition">Register</Link>
        {/* Dashboard is intentionally hidden from nav for security */}
      </nav>

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 text-white">
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center animate-fade-in">
                <h1 className="text-3xl font-bold mb-4 drop-shadow-sm">
                  “The secret of getting ahead is getting started.”
                </h1>
                <p className="mb-6 text-white/90">
                  Unlock inspiring quotes by registering your journey.
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/register"
                    className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold shadow hover:bg-purple-100 transition-all hover:scale-105"
                  >
                    Register Now
                  </Link>
                  <Link
                    to="/login"
                    className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all hover:scale-105"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          }
        />

        {/* Auth & Protected Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
