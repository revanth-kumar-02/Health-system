import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { getLoggedInUser } from '../utils/db';

export default function AccessDenied() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  // Get home route based on role
  const getHomeRoute = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'doctor') return '/doctor-dashboard';
    return '/patient-dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-medBg px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center">
        <div className="inline-flex p-4 rounded-full bg-red-50 text-red-600 mb-6">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2 font-display">Access Denied</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          You do not have the required permissions to access this page. This area is restricted to {user?.role === 'patient' ? 'Doctors/Admins' : user?.role === 'doctor' ? 'Admins/Patients' : 'authorized users'} only.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          <Link
            to={getHomeRoute()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-medTeal text-white font-semibold hover:bg-medDarkTeal transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
