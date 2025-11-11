import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold text-gray-800">QuizHub</Link>
          <Link to="/categories" className="text-sm text-gray-600 hover:text-gray-900">Categories</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
