import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getLoggedInUser, getDB, DB_KEYS } from '../utils/db';
import { Award, Mail, Phone, Clock, Calendar, CheckSquare, Stethoscope } from 'lucide-react';

const getDoctorInitials = (name) => {
  if (!name) return 'D';
  const cleanName = name.replace(/^(dr\.|dr)\s+/i, '').trim();
  const parts = cleanName.split(/\s+/);
  if (parts.length === 0) return 'D';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || 'D';
  return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
};

export default function DoctorProfile() {
  const doctorUser = getLoggedInUser();
  const doctors = getDB(DB_KEYS.DOCTORS);
  const [imgError, setImgError] = useState(false);

  // Find detailed doctor record matching the logged-in user
  const details = doctors.find((d) => d.email.toLowerCase() === doctorUser?.email.toLowerCase()) || {
    doctorName: doctorUser?.name,
    email: doctorUser?.email,
    phone: doctorUser?.phone || 'N/A',
    department: 'General Medicine',
    specialization: 'Physician',
    qualification: 'MD',
    experience: 'N/A',
    availableDays: [],
    availableTime: 'N/A',
    status: 'Available'
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-medBg">
      <Sidebar role="doctor" />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 font-display">Physician Profile</h1>
          <p className="text-slate-500 mt-1">Review your clinical certification details, specialization, and credentials registry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar summary */}
          <div className="bg-white rounded-3xl border border-teal-100/40 p-6 shadow-sm flex flex-col items-center justify-between text-center">
            <div className="pt-6">
              {/* Avatar with fallback */}
              {!imgError && details.avatarUrl ? (
                <img 
                  src={details.avatarUrl} 
                  alt={details.doctorName}
                  onError={() => setImgError(true)}
                  className="w-24 h-24 rounded-full object-cover border-2 border-teal-50 shadow-md mx-auto mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-tr from-medTeal to-medDarkTeal rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md mx-auto mb-4">
                  {getDoctorInitials(details.doctorName)}
                </div>
              )}

              <h3 className="text-lg font-bold text-slate-800">{details.doctorName}</h3>
              <p className="text-xs text-slate-400 font-medium uppercase mt-0.5">{details.department}</p>
              
              <div className="mt-4 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-semibold inline-flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" /> Active Practitioner
              </div>
            </div>

            <div className="w-full pt-6 mt-6 border-t border-slate-100 text-left text-xs space-y-2 text-slate-500">
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider block">Specialty Code</span>
                <p className="font-semibold text-slate-700 mt-0.5">{details.specialization}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider block">Direct Contact</span>
                <p className="font-semibold text-slate-700 mt-0.5">{details.phone}</p>
              </div>
            </div>
          </div>

          {/* Credentials information */}
          <div className="bg-white rounded-3xl border border-teal-100/40 p-6 md:p-8 shadow-sm md:col-span-2 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-4 font-display">Academic & Professional Credentials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100/60 flex items-start gap-3">
                  <Award className="w-5 h-5 text-medTeal mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Qualifications</span>
                    <p className="font-bold text-slate-700 mt-0.5">{details.qualification}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100/60 flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-sky-600 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Professional Experience</span>
                    <p className="font-bold text-slate-700 mt-0.5">{details.experience} Years Active Practice</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100"></div>

            {/* Timings */}
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-4 font-display">Assigned Weekly Availability</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Available Consultation Days</span>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(details.availableDays) ? details.availableDays.map((day) => (
                      <span key={day} className="px-3 py-1 rounded-xl bg-teal-50 border border-teal-100/20 text-medDarkTeal font-semibold text-xs">
                        {day}
                      </span>
                    )) : <span className="text-slate-500 italic">None</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Time Block</span>
                    <p className="font-semibold text-slate-700">{details.availableTime}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Consultation Status</span>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded inline-block">
                      {details.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
