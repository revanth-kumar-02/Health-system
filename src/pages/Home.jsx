import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Building2, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Clock,
  Sparkles,
  UserCheck
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-br from-white via-[#F5FAFA] to-[#EBF6F6] rounded-3xl border border-teal-100/40 p-8 md:p-12 lg:p-16 shadow-md shadow-teal-600/5 relative overflow-hidden mb-16 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="relative z-10 lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medTeal/10 border border-medTeal/20 text-xs font-bold text-medDarkTeal">
              <Sparkles className="w-3.5 h-3.5 text-medTeal animate-pulse" />
              <span>Trusted Hospital Management System</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
              Health Care <span className="text-medTeal">System</span>
            </h1>
            
            <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Welcome to our smart healthcare portal. Easily search medical departments, view active physician consulting hours, and book appointment slots in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/book-appointment"
                className="px-6 py-3.5 rounded-xl bg-medTeal text-white font-bold hover:bg-medDarkTeal transition-all duration-300 shadow-md shadow-teal-700/10 hover:shadow-lg active:scale-[0.98] text-center text-sm min-w-44 flex items-center justify-center"
              >
                Book Appointment
              </Link>
              <Link
                to="/doctors"
                className="px-6 py-3.5 rounded-xl border-2 border-medTeal/20 hover:border-medTeal text-medTeal font-bold hover:bg-teal-50/30 transition-all duration-300 text-center text-sm min-w-44 flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>View Doctors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero Right: Modern SaaS Medical Dashboard Illustration */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center relative">
            <div className="relative w-full max-w-sm bg-white/70 backdrop-blur-sm rounded-2xl border border-teal-100/40 p-6 shadow-xl shadow-teal-600/5 space-y-4 animate-fadeIn">
              
              {/* Doctor Status Card */}
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Dr. Ravi Kumar</p>
                    <p className="text-[10px] text-slate-400 font-semibold">General Medicine</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[9px] font-bold">
                  Available
                </span>
              </div>

              {/* Calendar Slots Simulation */}
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm space-y-3">
                <p className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Choose Available Slots</span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <span className="py-2 bg-slate-50 border border-slate-100 text-slate-300 text-[10px] font-semibold text-center rounded-lg line-through">09:00 AM</span>
                  <span className="py-2 bg-medTeal text-white text-[10px] font-bold text-center rounded-lg shadow-sm shadow-teal-600/10">09:30 AM</span>
                  <span className="py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold text-center rounded-lg hover:border-medTeal cursor-pointer">10:00 AM</span>
                </div>
              </div>

              {/* Consultation Info Card */}
              <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100/20 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-medTeal shadow-sm">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-medDarkTeal">Consultation block size</p>
                  <p className="text-[10px] text-medTeal font-bold">30 Minutes Interval</p>
                </div>
              </div>
            </div>
            
            {/* Background decorative orb */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-medSoftBlue/30 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-16 md:mb-20">
        <h2 className="text-xl font-extrabold text-slate-800 mb-6 font-display">Hospital at a Glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Doctors Stat (Blue) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:scale-[1.01] transition-all duration-300">
            <div className="p-4 rounded-xl bg-blue-50/70 text-blue-600 border border-blue-100/30">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">{doctorsCount}</p>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">Physicians & Doctors</p>
            </div>
          </div>

          {/* Departments Stat (Green) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:scale-[1.01] transition-all duration-300">
            <div className="p-4 rounded-xl bg-emerald-50/70 text-emerald-600 border border-emerald-100/30">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">{departmentsCount}</p>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">Clinics & Departments</p>
            </div>
          </div>

          {/* Patients Stat (Purple) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:scale-[1.01] transition-all duration-300">
            <div className="p-4 rounded-xl bg-purple-50/70 text-purple-600 border border-purple-100/30">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">{patientsCount}</p>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">Patients Registered</p>
            </div>
          </div>

          {/* Bookings Stat (Orange) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:scale-[1.01] transition-all duration-300">
            <div className="p-4 rounded-xl bg-amber-50/70 text-amber-600 border border-amber-100/30">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">{bookingsCount}</p>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">Appointments Booked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.005] transition-all duration-300 flex flex-col justify-between min-h-[220px]">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">Specialist Booking Made Easy</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Select your department, choose your preferred doctor, pick an open date, and grab your specific slot in seconds. All patient bookings are saved securely in your personal list.
            </p>
          </div>
          <Link to="/book-appointment" className="text-medTeal font-bold text-sm inline-flex items-center gap-1 hover:text-medDarkTeal transition-colors">
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.005] transition-all duration-300 flex flex-col justify-between min-h-[220px]">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 font-display">Check Hospital Schedules</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Avoid wait times! Check the active working hours and weekly available days of all hospital departments and consulting physicians online before planning your visit.
            </p>
          </div>
          <Link to="/schedule" className="text-medTeal font-bold text-sm inline-flex items-center gap-1 hover:text-medDarkTeal transition-colors">
            View Weekly Schedules <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

