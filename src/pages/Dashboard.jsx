import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const email = localStorage.getItem('userEmail');

const BACKEND_URL = "https://sasi-login-backend-1.onrender.com"; // ✅ Use this in production
0
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || !email) {
      alert('Unauthorized access. Please log in.');
      navigate('/login');
    } else {
      fetchDocuments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('Logged out successfully');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please choose a PDF to upload.");

    const formData = new FormData();
    formData.append('document', selectedFile);
    formData.append('email', email);

    try {
      await axios.post(`${BACKEND_URL}/api/documents/upload`, formData);
      alert('File uploaded successfully');
      setSelectedFile(null);
      fetchDocuments();
    } catch (err) {
      alert('Upload failed');
      console.error('Upload error:', err);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/documents/user/${email}`);
      setDocuments(res.data.documents);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl animate-fade-in">
        <h2 className="text-4xl font-bold mb-6 text-center">📄 My Dashboard</h2>

        <div className="mb-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <button
            onClick={handleUpload}
            className="ml-4 py-2 px-5 bg-green-600 hover:bg-green-700 rounded-md font-semibold transition-transform transform hover:scale-105"
          >
            Upload PDF
          </button>
        </div>

        <h3 className="text-2xl font-semibold mb-4">📑 Uploaded Documents</h3>
        <div className="space-y-4">
          {documents.length === 0 ? (
            <p className="text-white/80 italic">No documents uploaded yet.</p>
          ) : (
            documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white/20 rounded-lg p-4 flex justify-between items-center hover:bg-white/30 transition"
              >
                <p className="truncate">{doc}</p>
                <a
                  href={`${BACKEND_URL}${doc}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  View
                </a>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
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
