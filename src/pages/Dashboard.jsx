// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('pdf');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
  `https://sasi-login-backend-3.onrender.com/api/documents/user/${user.email}`,
  {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
);

      setDocuments(res.data.documents);
    } catch (err) {
      setError('Failed to fetch documents');
      console.error('Failed to fetch documents:', err);
    } finally {
      setLoading(false);
    }
  }, [user.email, user.token]);

  useEffect(() => {
    if (!user) {
      alert('Unauthorized access. Please log in.');
      navigate('/login');
    } else {
      fetchDocuments();
      const interval = setInterval(fetchDocuments, 10000);
      return () => clearInterval(interval);
    }
  }, [user, navigate, fetchDocuments]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('Please choose a PDF to upload.');
    if (!fileName) return alert('Please enter a file name.');

    const formData = new FormData();
    formData.append('document', selectedFile);
    formData.append('email', user.email);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);

    try {
      setLoading(true);
      const res = await axios.post(
  "https://sasi-login-backend-3.onrender.com/api/documents/upload",
  formData,
  {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert(res.data.message);
      setSelectedFile(null);
      setFileName('');
      setFileType('pdf');
      fetchDocuments();
    } catch (err) {
      alert('Upload failed');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-4xl text-white animate-fade-in">
        <h2 className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <span>📄</span> My Dashboard
        </h2>

        <div className="mb-8 p-6 bg-white/20 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Upload New Document</h3>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm">File</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">File Name</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">File Type</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="pdf">PDF</option>
                <option value="certification">Certification</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-4 w-full py-2 px-5 bg-green-600 hover:bg-green-700 rounded-md font-semibold transition-transform transform hover:scale-105 flex items-center justify-center gap-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Uploading...' : (
              <>
                <span>Upload</span>
                <span>⬆️</span>
              </>
            )}
          </button>
        </div>

        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span>📑</span> Uploaded Documents
        </h3>
        {loading && <p className="text-white/80 italic">Loading documents...</p>}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {documents.length === 0 ? (
            <p className="text-white/80 italic">No documents uploaded yet.</p>
          ) : (
            documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white/20 rounded-lg p-4 flex justify-between items-center hover:bg-white/30 transition-all transform hover:scale-[1.01]"
              >
                <div className="truncate w-3/4">
                  <p className="font-semibold">{doc.fileName}</p>
                  <p className="text-sm text-gray-300">Type: {doc.fileType}</p>
                  <p className="text-sm text-gray-300">
                    Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 transition flex items-center gap-1"
                >
                  <span>View</span>
                  <span>👁️</span>
                </a>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <span>Logout</span>
            <span>🚪</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
