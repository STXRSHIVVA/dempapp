// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/auth/login', form, {
        withCredentials: true,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
        aria-label="Login form"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-green-400 text-center mb-6">Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
          aria-label="Email"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
          aria-label="Password"
        />

        {error && (
          <p className="text-red-500 font-semibold text-center" role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 transition font-semibold py-3 rounded-lg shadow-md shadow-green-700/50"
          aria-label="Submit login form"
        >
          Login
        </button>
        <a href="/signup" className="text-sm text-gray-400 hover:text-gray-300 transition">
          Don't have an account? Sign up
        </a>
      </form>
    </div>
  );
};

export default Login;
