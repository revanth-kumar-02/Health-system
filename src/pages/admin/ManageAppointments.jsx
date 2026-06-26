import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDB, setDB, DB_KEYS } from '../../utils/db';
import { Search, Calendar, Trash2, XCircle, FileText, CheckCircle } from 'lucide-react';

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState(getDB(DB_KEYS.APPOINTMENTS));
  const [patientSearch, setPatientSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Filter
  const filtered = appointments.filter((apt) => {
    const matchesPatient = apt.patientName.toLowerCase().includes(patientSearch.toLowerCase());
    const matchesDoctor = apt.doctorName.toLowerCase().includes(doctorSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.appointmentDate === dateFilter;
    return matchesPatient && matchesDoctor && matchesStatus && matchesDate;
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

  const handleCancel = (aptId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      handleUpdateStatus(aptId, 'Cancelled');
    }
  };

  const handleDelete = (aptId) => {
    if (window.confirm('Are you sure you want to delete this appointment from the registry?')) {
      const allAppointments = getDB(DB_KEYS.APPOINTMENTS);
      const updated = allAppointments.filter((apt) => apt.appointmentId !== aptId);
      setDB(DB_KEYS.APPOINTMENTS, updated);
      setAppointments(updated);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-medBg">
      <Sidebar role="admin" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 font-display">Manage Appointments</h1>
          <p className="text-slate-500 mt-1">Review all active, pending, or completed consultations and update their status.</p>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white rounded-2xl border border-teal-100/40 p-5 shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Patient Search */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Search Patient</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="Patient name..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-xs transition-all"
              />
            </div>
          </div>

          {/* Doctor Search */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Search Doctor</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="Doctor name..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-xs transition-all"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-xs transition-all bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-xs transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action status message / table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-teal-100/40 p-12 text-center text-slate-500">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-semibold text-lg">No appointments found matching parameters.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-teal-100/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Apt ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Patient</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Doctor / Clinic</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date & Slot</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Update Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-slate-700 text-sm">
                  {filtered.map((apt) => (
                    <tr key={apt.appointmentId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{apt.appointmentId}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{apt.patientName}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-700">{apt.doctorName}</div>
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-teal-50 text-medTeal border border-teal-100/20 mt-0.5 inline-block">
                          {apt.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-700">{apt.appointmentDate}</div>
                        <div className="text-xs text-slate-400 font-medium">{apt.timeSlot}</div>
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
                        <select
                          value={apt.status}
                          onChange={(e) => handleUpdateStatus(apt.appointmentId, e.target.value)}
                          className="text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 focus:outline-none text-slate-700 bg-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                            <button
                              onClick={() => handleCancel(apt.appointmentId)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                              title="Cancel Appointment"
                            >
                              <XCircle className="w-4.5 h-4.5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(apt.appointmentId)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Appointment"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
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
