import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getDB, DB_KEYS, getDashboardSummary } from '../utils/db';
import { 
  Building, 
  Users, 
  UserSquare2, 
  CalendarDays, 
  PlusCircle, 
  CalendarPlus, 
  ArrowRight,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export default function AdminDashboard() {
  const appointments = getDB(DB_KEYS.APPOINTMENTS);
  const { patientsCount, doctorsCount, departmentsCount, bookingsCount } = getDashboardSummary();

  // Get recent 5 appointments
  const recentAppointments = [...appointments]
    .sort((a, b) => b.appointmentId.localeCompare(a.appointmentId))
    .slice(0, 5);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-medBg">
      <Sidebar role="admin" />

      <main className="flex-1 p-8">
        {/* Header Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 font-display">Administration Dashboard</h1>
            <p className="text-slate-500 mt-1">Hospital metrics, quick actions center, and system databases registry.</p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/add-doctor"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-medTeal text-white font-bold text-xs hover:bg-medDarkTeal transition-all shadow-sm active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" /> Add Doctor
            </Link>
            <Link
              to="/admin/create-schedule"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
            >
              <CalendarPlus className="w-4 h-4 text-slate-500" /> Create Schedule
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-teal-50 text-medTeal rounded-xl">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{departmentsCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Departments</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
              <UserSquare2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{doctorsCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Physicians</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{patientsCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patients Registered</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{bookingsCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments Activity */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-teal-100/40 p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-slate-800 font-display flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-medTeal animate-pulse" /> Recent Booking Activity
                </h3>
                <Link
                  to="/admin/manage-appointments"
                  className="text-xs font-bold text-medTeal hover:underline inline-flex items-center gap-0.5"
                >
                  View All Appointments <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {recentAppointments.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  <CalendarDays className="w-12 h-12 mx-auto text-slate-200 mb-3" />
                  <p className="font-semibold">No appointments found in the system registry.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentAppointments.map((apt) => (
                    <div 
                      key={apt.appointmentId} 
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 text-sm">{apt.patientName}</h4>
                          <span className="text-[9px] font-mono text-slate-400">ID: {apt.patientId}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          Consulting <span className="font-bold text-slate-700">{apt.doctorName}</span> ({apt.department})
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-xs text-slate-400 font-semibold block">{apt.appointmentDate} • {apt.timeSlot}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold mt-1 inline-block ${
                          apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          apt.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          apt.status === 'Completed' ? 'bg-sky-50 text-sky-700 border border-sky-100' : 
                          'bg-rose-50 text-rose-700 border border-rose-100'
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

          {/* Quick Directories List */}
          <div className="bg-white rounded-3xl border border-teal-100/40 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-4 font-display flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-medTeal" /> Quick Directories
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">Jump straight into system records to inspect, modify, or delete entries.</p>
              
              <div className="space-y-2">
                <Link
                  to="/admin/manage-doctors"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-teal-50/20 hover:border-teal-100/40 transition-all font-semibold text-slate-700 text-sm"
                >
                  <span>Manage Doctors</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/admin/manage-departments"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-teal-50/20 hover:border-teal-100/40 transition-all font-semibold text-slate-700 text-sm"
                >
                  <span>Manage Clinics / Departments</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/admin/manage-schedules"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-teal-50/20 hover:border-teal-100/40 transition-all font-semibold text-slate-700 text-sm"
                >
                  <span>Doctor Schedules</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/admin/manage-appointments"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-teal-50/20 hover:border-teal-100/40 transition-all font-semibold text-slate-700 text-sm"
                >
                  <span>Appointments</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/admin/view-patients"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-teal-50/20 hover:border-teal-100/40 transition-all font-semibold text-slate-700 text-sm"
                >
                  <span>Patients List</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-400 text-center font-medium">
              Health Care Admin Portal v1.0.0
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
