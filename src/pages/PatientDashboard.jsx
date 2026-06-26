import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser, getDB, DB_KEYS } from '../utils/db';
import { 
  CalendarDays, 
  CalendarPlus, 
  User, 
  Activity, 
  Clock, 
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function PatientDashboard() {
  const patient = getLoggedInUser();
  const appointments = getDB(DB_KEYS.APPOINTMENTS);

  // Filter appointments for this patient
  const patientAppointments = appointments.filter(
    (apt) => apt.patientId === patient?.id
  );

  const totalAppointments = patientAppointments.length;
  const pendingAppointments = patientAppointments.filter(a => a.status === 'Pending').length;
  const confirmedAppointments = patientAppointments.filter(a => a.status === 'Confirmed').length;
  const cancelledAppointments = patientAppointments.filter(a => a.status === 'Cancelled').length;

  // Get next upcoming appointment
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingAppointment = patientAppointments
    .filter(a => (a.status === 'Confirmed' || a.status === 'Pending') && a.appointmentDate >= todayStr)
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Dashboard Greeting Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 font-display">
          Hello, <span className="text-medTeal">{patient?.name}</span>
        </h1>
        <p className="text-slate-500 mt-1">Welcome back to your patient care dashboard. Review your schedule and active bookings.</p>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link 
          to="/book-appointment"
          className="bg-gradient-to-tr from-medTeal to-medDarkTeal rounded-2xl p-6 text-white shadow-md hover:shadow-lg hover:shadow-teal-700/10 transition-all group flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <CalendarPlus className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-md">New Booking</span>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Book Appointment</h3>
            <p className="text-teal-50 text-xs leading-relaxed group-hover:underline">Choose a doctor and schedule a session in just a few clicks →</p>
          </div>
        </Link>

        <Link 
          to="/my-appointments"
          className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <CalendarDays className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">View History</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">My Appointments</h3>
            <p className="text-slate-500 text-xs leading-relaxed group-hover:underline">Monitor, manage, or cancel your booked consultation slots →</p>
          </div>
        </Link>

        <Link 
          to="/patient-profile"
          className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <User className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Profile Details</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">My Personal Profile</h3>
            <p className="text-slate-500 text-xs leading-relaxed group-hover:underline">Manage details, phone number, and gender configuration →</p>
          </div>
        </Link>
      </div>

      {/* Stats row & Next Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-slate-800 font-display">Appointments Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-slate-700">{totalAppointments}</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Total</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-amber-600">{pendingAppointments}</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Pending</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-emerald-600">{confirmedAppointments}</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Confirmed</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-rose-500">{cancelledAppointments}</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Cancelled</p>
            </div>
          </div>

          {/* Recent list */}
          <div className="bg-white rounded-2xl border border-teal-100/40 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-base">Recent Activity</h3>
              <Link to="/my-appointments" className="text-xs font-bold text-medTeal hover:underline">View All</Link>
            </div>
            
            {patientAppointments.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p>No appointments booked yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {patientAppointments.slice(0, 3).map((apt) => (
                  <div key={apt.appointmentId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{apt.doctorName}</h4>
                      <p className="text-xs text-slate-400 font-medium uppercase mt-0.5">{apt.department} • Slot: {apt.timeSlot}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{apt.appointmentDate}</span>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' :
                        apt.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        apt.status === 'Completed' ? 'bg-sky-50 text-sky-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Next upcoming appointment card */}
        <div className="bg-white rounded-2xl border border-teal-100/40 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-base mb-4 font-display">Upcoming Appointment</h3>
            
            {upcomingAppointment ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-100/30 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-medTeal mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-medDarkTeal text-sm">{upcomingAppointment.doctorName}</h4>
                    <p className="text-xs font-semibold text-medTeal uppercase mt-0.5">{upcomingAppointment.department}</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-semibold text-slate-700">{upcomingAppointment.appointmentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Slot:</span>
                    <span className="font-semibold text-slate-700">{upcomingAppointment.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      upcomingAppointment.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {upcomingAppointment.status}
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 text-xs block mb-1">Reason for Visit:</span>
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      "{upcomingAppointment.reasonForVisit}"
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm">
                <AlertCircle className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p>No upcoming schedules.</p>
                <Link to="/book-appointment" className="text-xs font-bold text-medTeal mt-2 inline-block hover:underline">
                  Book one now
                </Link>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-400 leading-relaxed">
            Need emergency support? Contact the front desk at <span className="font-bold text-slate-600 whitespace-nowrap">1-800-HOSPITAL</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
