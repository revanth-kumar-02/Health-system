import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Building2, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { getDB, DB_KEYS } from '../utils/db';

export default function Home() {
  const navigate = useNavigate();

  // Load stats from localStorage
  const doctors = getDB(DB_KEYS.DOCTORS);
  const departments = getDB(DB_KEYS.DEPARTMENTS);
  const appointments = getDB(DB_KEYS.APPOINTMENTS);
  const users = getDB(DB_KEYS.USERS);
  
  const patientsCount = users.filter(u => u.role === 'patient').length;
  const doctorsCount = doctors.length;
  const departmentsCount = departments.length;
  const bookingsCount = appointments.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-medDarkTeal to-medTeal rounded-3xl text-white p-8 md:p-12 shadow-xl relative overflow-hidden mb-12">
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12 pointer-events-none">
          <Stethoscope className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-teal-200" />
            <span>Fully Secure & HIPAA Compliant Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-4">
            Health Care System
          </h1>
          <p className="text-lg md:text-xl text-teal-50 font-medium mb-8 leading-relaxed">
            Welcome to our smart health portal. Easily book slots for top specialists, view hospital schedules, and manage medical appointments in real-time.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to="/book-appointment"
              className="px-6 py-3.5 rounded-xl bg-white text-medDarkTeal font-bold hover:bg-teal-50 transition-all shadow-md active:scale-[0.98]"
            >
              Book Appointment
            </Link>
            <Link
              to="/doctors"
              className="px-6 py-3.5 rounded-xl bg-teal-800 text-white font-bold hover:bg-teal-900 border border-teal-700/50 transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <span>View Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <h2 className="text-xl font-extrabold text-slate-800 mb-6 font-display">Hospital at a Glance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Doctors Stat */}
        <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-teal-50 text-medTeal">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-800">{doctorsCount}</p>
            <p className="text-sm font-semibold text-slate-500">Physicians & Doctors</p>
          </div>
        </div>

        {/* Departments Stat */}
        <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-sky-50 text-sky-600">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-800">{departmentsCount}</p>
            <p className="text-sm font-semibold text-slate-500">Clinics & Departments</p>
          </div>
        </div>

        {/* Patients Stat */}
        <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-800">{patientsCount}</p>
            <p className="text-sm font-semibold text-slate-500">Registered Patients</p>
          </div>
        </div>

        {/* Bookings Stat */}
        <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 rounded-xl bg-indigo-50 text-indigo-600">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-800">{bookingsCount}</p>
            <p className="text-sm font-semibold text-slate-500">Appointments Booked</p>
          </div>
        </div>
      </div>

      {/* Services Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-teal-100/40 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">Specialist Booking Made Easy</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Select your department, choose your preferred doctor, pick an open date, and grab your specific slot in seconds. All patient bookings are saved securely in your personal list.
          </p>
          <Link to="/book-appointment" className="text-medTeal font-bold text-sm inline-flex items-center gap-1 hover:underline">
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-teal-100/40 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">Check Hospital Schedules</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Avoid wait times! Check the active working hours and weekly available days of all hospital departments and consulting physicians online before planning your visit.
          </p>
          <Link to="/schedule" className="text-medTeal font-bold text-sm inline-flex items-center gap-1 hover:underline">
            View Weekly Schedules <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
