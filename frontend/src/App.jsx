import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/DashBoards.jsx'; // ✅ Imported Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />      
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/auth/signup" element={<Signup />} />
        <Route path="api/auth/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
