import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      alert('Unauthorized access. Please log in.');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl p-10 rounded-3xl text-center w-full max-w-xl animate-fade-in">
        <h2 className="text-4xl font-extrabold text-white mb-4"> Welcome To Nature</h2>
        <p className="text-white/80 text-lg mb-8">Nature is the essence of life itself — a vast, interconnected web that sustains every living being on Earth. From the towering trees of dense forests to the gentle ripple of a mountain stream, nature expresses beauty, balance, and resilience. It operates in perfect harmony, where every organism, no matter how small, has a purpose and role to play. Observing nature teaches us invaluable lessons about patience, renewal, and adaptability. It offers peace to our minds, inspiration to our souls, and a reminder that we are part of something much larger. In a world increasingly dominated by technology and fast-paced living, returning to nature helps us slow down, reflect, and find meaning in simplicity.</p>

        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
