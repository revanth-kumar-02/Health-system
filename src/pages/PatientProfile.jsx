import React, { useState } from 'react';
import { getLoggedInUser, getDB, setDB, DB_KEYS } from '../utils/db';
import { User, Mail, Phone, Calendar, Heart, ShieldCheck, CheckCircle } from 'lucide-react';

export default function PatientProfile() {
  const currentSessionUser = getLoggedInUser();
  const users = getDB(DB_KEYS.USERS);
  
  // Find current user's full data from DB
  const patientData = users.find(u => u.id === currentSessionUser?.id) || currentSessionUser;

  const [name, setName] = useState(patientData.name || '');
  const [phone, setPhone] = useState(patientData.phone || '');
  const [gender, setGender] = useState(patientData.gender || 'Male');
  const [dob, setDob] = useState(patientData.dob || '');
  const [success, setSuccess] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccess('');

    // Update inside users array
    const updatedUsers = users.map((u) => {
      if (u.id === patientData.id) {
        return {
          ...u,
          name,
          phone,
          gender,
          dob
        };
      }
      return u;
    });

    setDB(DB_KEYS.USERS, updatedUsers);
    
    // Update loggedInUser session
    const updatedSession = {
      ...currentSessionUser,
      name
    };
    setLoggedInUser(updatedSession);

    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 font-display">Patient Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal demographics, contact parameters, and registration records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card Summary */}
        <div className="bg-white rounded-3xl border border-teal-100/40 p-6 shadow-sm flex flex-col items-center justify-between text-center">
          <div className="pt-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-medTeal to-medDarkTeal rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-md mb-4 mx-auto">
              {name ? name[0] : 'P'}
            </div>
            
            <h3 className="text-lg font-bold text-slate-800">{name}</h3>
            <p className="text-xs text-slate-400 font-medium uppercase mt-0.5">{patientData.role} account</p>
            
            <div className="mt-4 px-4 py-1.5 rounded-full bg-teal-50 text-medDarkTeal text-xs font-semibold inline-flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-medTeal" /> Active Member
            </div>
          </div>
          
          <div className="w-full pt-6 mt-6 border-t border-slate-100 text-left text-xs space-y-2 text-slate-500">
            <div>
              <span className="text-slate-400 font-medium">Patient ID:</span>
              <p className="font-mono font-bold text-slate-700 mt-0.5">{patientData.id}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Registered Email:</span>
              <p className="font-semibold text-slate-700 mt-0.5">{patientData.email}</p>
            </div>
          </div>
        </div>

        {/* Edit Demographics Details */}
        <div className="bg-white rounded-3xl border border-teal-100/40 p-6 md:p-8 shadow-sm md:col-span-2">
          <h3 className="font-bold text-slate-800 text-base mb-6 font-display">Personal Details</h3>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 flex items-center gap-2.5 text-sm animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">{success}</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Registered Email (Read Only)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={patientData.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 text-sm font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm font-medium transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Gender
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <Heart className="w-4 h-4" />
                </span>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm font-medium transition-all bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-medTeal hover:bg-medDarkTeal text-white font-bold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
