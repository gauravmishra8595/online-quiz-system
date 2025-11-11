import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Online Quiz System</h1>
      <p className="mb-6 text-gray-700">Choose a category and test your knowledge. Register and login to save results and track progress.</p>
      <div className="flex justify-center gap-4">
        <Link to="/categories" className="px-6 py-3 rounded-xl bg-indigo-600 text-white">Choose Category</Link>
        <Link to="/register" className="px-6 py-3 rounded-xl border">Register</Link>
      </div>
    </div>
  );
}
