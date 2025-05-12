import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css'; // For fade-in animation

function App() {
  return (
    <Router>
      <nav className="flex gap-6 p-4 bg-white shadow-md text-sm font-medium text-gray-800 font-sans">
        <Link to="/" className="hover:text-blue-600 hover:underline transition">Home</Link>
        <Link to="/login" className="hover:text-blue-600 hover:underline transition">Login</Link>
        <Link to="/register" className="hover:text-blue-600 hover:underline transition">Register</Link>
      </nav>

      <Routes>
        {/* Homepage with background image */}
        <Route
          path="/"
          element={
            <div
  className="flex items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat relative"

              style={{
                backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-electronic-technology-website-texture-background-banner-image_156039.jpg')`,
              }}
            >
              {/* Overlay for contrast */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Glass Card */}
              <div className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center animate-fade-in text-white font-sans">
                <h1 className="text-4xl font-bold mb-4 drop-shadow">
                  Welcome to Your Certificates Vault
                </h1>
                <p className="mb-6 text-white/90 text-base">
                  One platform. All your certificates. Store them safely. Access them anytime.
                </p>
                <div className="flex justify-center gap-4 mt-4">
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

        {/* Other Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
