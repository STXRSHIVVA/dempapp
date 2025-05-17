// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Fetch user info from session (protected route)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/dashboard', {
          withCredentials: true,
        });
        setUsername(res.data.message);
      } catch {
        setError('Unauthorized. Please login.');
        setTimeout(() => navigate('/login'), 2000); // redirect after 2s
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-green-400">
          Welcome
        </h2>

        {error ? (
          <p className="text-red-500 font-semibold" role="alert">{error}</p>
        ) : (
          <>
            <p className="text-lg text-gray-300">{username}</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 hover:bg-red-700 active:bg-red-800 transition font-semibold py-2 px-4 rounded-lg shadow-md shadow-red-700/50"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
