import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getLoggedInUser, getDB, setDB, DB_KEYS } from '../utils/db';
import { Calendar, Search, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function DoctorAppointments() {
  const doctor = getLoggedInUser();
  const [appointments, setAppointments] = useState(getDB(DB_KEYS.APPOINTMENTS));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Filter appointments assigned to this doctor
  const doctorAppointments = appointments.filter(
    (apt) => apt.doctorId === doctor?.id
  );

  // Apply filters
  const filtered = doctorAppointments.filter((apt) => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.appointmentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.appointmentDate === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

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
      <Sidebar role="doctor" />

      <main className="flex-1 p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 font-display">Manage Doctor Appointments</h1>
            <p className="text-slate-500 mt-1">Search bookings, verify timelines, and adjust appointment consultation states.</p>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white rounded-2xl border border-teal-100/40 p-5 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patient name or ID..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm transition-all bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative w-full md:w-56">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
              <Calendar className="w-4 h-4" />
            </span>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm transition-all"
            />
          </div>

          {/* Clear Filters */}
          {(searchTerm || statusFilter !== 'All' || dateFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setDateFilter('');
              }}
              className="text-xs font-bold text-medTeal hover:text-medDarkTeal bg-teal-50 px-3 py-2 rounded-xl border border-teal-100/30 transition-colors whitespace-nowrap self-stretch md:self-center"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Appointments Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-teal-100/40 p-12 text-center text-slate-500">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-semibold text-lg">No appointments found matching filters.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-teal-100/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Apt ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Patient</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date & Slot</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Reason for Visit</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Update Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-slate-700 text-sm">
                  {filtered.map((apt) => (
                    <tr key={apt.appointmentId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{apt.appointmentId}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{apt.patientName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {apt.patientId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-700">{apt.appointmentDate}</div>
                        <div className="text-xs text-slate-400 font-medium">{apt.timeSlot}</div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate" title={apt.reasonForVisit}>
                        {apt.reasonForVisit}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                          apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          apt.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          apt.status === 'Completed' ? 'bg-sky-50 text-sky-700 border border-sky-100' : 
                          'bg-rose-50 text-rose-700 border border-rose-100'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <select
                            value={apt.status}
                            onChange={(e) => handleUpdateStatus(apt.appointmentId, e.target.value)}
                            className="text-xs font-semibold py-1.5 px-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-medTeal text-slate-700 bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
