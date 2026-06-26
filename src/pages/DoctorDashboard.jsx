import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getLoggedInUser, getDB, setDB, DB_KEYS } from '../utils/db';
import { CalendarDays, Clock, FileText, CheckCircle2, AlertCircle, Sparkles, Check, X, ClipboardList } from 'lucide-react';

export default function DoctorDashboard() {
  const doctor = getLoggedInUser();
  const [appointments, setAppointments] = useState(getDB(DB_KEYS.APPOINTMENTS));

  // Filter appointments assigned to this doctor
  const doctorAppointments = appointments.filter(
    (apt) => apt.doctorId === doctor?.id
  );

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = doctorAppointments.filter(
    (apt) => apt.appointmentDate === todayStr
  );

  // Statistics
  const totalCount = doctorAppointments.length;
  const todayCount = todayAppointments.length;
  const pendingCount = doctorAppointments.filter(a => a.status === 'Pending').length;
  const completedCount = doctorAppointments.filter(a => a.status === 'Completed').length;

  const handleUpdateStatus = (aptId, newStatus) => {
    const allAppointments = getDB(DB_KEYS.APPOINTMENTS);
    const updated = allAppointments.map((apt) => {
      if (apt.appointmentId === aptId) {
        return { ...apt, status: newStatus };
      }
      return apt;
    });

    setDB(DB_KEYS.APPOINTMENTS, updated);
    setAppointments(updated);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-medBg">
      {/* Sidebar Navigation */}
      <Sidebar role="doctor" />

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 font-display">
            Welcome back, <span className="text-medTeal">{doctor?.name}</span>
          </h1>
          <p className="text-slate-500 mt-1">Here is the medical schedule overview and patient session timeline for today.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-teal-50 text-medTeal rounded-xl">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{todayCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today's Visits</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{totalCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{pendingCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Approvals</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-teal-100/40 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-700">{completedCount}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Sessions</p>
            </div>
          </div>
        </div>

        {/* Today's Appointments Timeline */}
        <div className="bg-white rounded-3xl border border-teal-100/40 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-medTeal" /> Today's Consultation Schedule ({todayStr})
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-lg">
              {todayAppointments.length} Patient{todayAppointments.length !== 1 ? 's' : ''}
            </span>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-2xl">
              <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-semibold">No appointments scheduled for today.</p>
              <p className="text-xs text-slate-400 mt-1">Schedules will appear here as patients book times.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((apt) => (
                <div 
                  key={apt.appointmentId} 
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50/20 hover:bg-slate-50/50 transition-colors gap-4"
                >
                  {/* Left info: Time & Patient */}
                  <div className="flex items-start gap-4">
                    <div className="py-2 px-3 bg-medTeal text-white font-bold rounded-xl text-center flex flex-col justify-center min-w-24 text-xs shadow-sm">
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      <span>{apt.timeSlot}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">{apt.patientName}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">ID: {apt.patientId} | Apt ID: {apt.appointmentId}</p>
                      <p className="text-slate-600 text-sm mt-2 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-100 inline-block">
                        <span className="text-slate-400 text-xs font-semibold block mb-0.5 uppercase tracking-wider">Symptom / Reason</span>
                        "{apt.reasonForVisit}"
                      </p>
                    </div>
                  </div>

                  {/* Right actions & Status */}
                  <div className="flex flex-wrap items-center gap-3 lg:self-center">
                    <div className="flex flex-col items-end mr-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Current Status</span>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        apt.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        apt.status === 'Completed' ? 'bg-sky-50 text-sky-700 border border-sky-100' : 
                        'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="h-8 w-px bg-slate-200 hidden lg:block"></div>

                    {/* Quick status update buttons */}
                    <div className="flex gap-2">
                      {apt.status !== 'Confirmed' && apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.appointmentId, 'Confirmed')}
                          className="p-2 rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 transition-colors"
                          title="Confirm Session"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.appointmentId, 'Completed')}
                          className="p-2 rounded-xl text-sky-600 bg-sky-50 hover:bg-sky-100 border border-sky-200/50 transition-colors"
                          title="Mark Completed"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.appointmentId, 'Cancelled')}
                          className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/50 transition-colors"
                          title="Cancel Session"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
