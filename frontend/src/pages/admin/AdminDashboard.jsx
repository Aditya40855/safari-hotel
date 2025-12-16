// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="space-y-3">
        <Link to="/admin/hotels/new" className="inline-block px-4 py-2 bg-orange-600 text-white rounded">Add Hotel</Link>
        <Link to="/admin/safaris/new" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Add Safari</Link>
      </div>
    </div>
  );
}