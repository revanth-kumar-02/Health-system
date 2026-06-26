import React, { useState } from 'react';
import { getLoggedInUser, getDB, setDB, DB_KEYS } from '../utils/db';
import { CalendarDays, AlertTriangle, XCircle, Search, Calendar, FileText } from 'lucide-react';

export default function MyAppointments() {
  const patient = getLoggedInUser();
  const [appointments, setAppointments] = useState(getDB(DB_KEYS.APPOINTMENTS));
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState(null);

  // Filter appointments for this patient
  const patientAppointments = appointments.filter(
    (apt) => apt.patientId === patient?.id
  );

  const handleCancelClick = (aptId) => {
    setSelectedAptId(aptId);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (!selectedAptId) return;

    // Update appointment status in db
    const allAppointments = getDB(DB_KEYS.APPOINTMENTS);
    const updated = allAppointments.map((apt) => {
      if (apt.appointmentId === selectedAptId) {
        return { ...apt, status: 'Cancelled' };
      }
      return apt;
    });

    setDB(DB_KEYS.APPOINTMENTS, updated);
    setAppointments(updated);
    setShowCancelModal(false);
    setSelectedAptId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 font-display">My Booked Appointments</h1>
        <p className="text-slate-500 mt-1">Review your clinical consultation history, check confirmation status, or cancel upcoming reservations.</p>
      </div>

      {/* List content */}
      {patientAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-teal-100/40 p-12 text-center text-slate-500 max-w-2xl mx-auto">
          <CalendarDays className="w-16 h-16 mx-auto text-slate-300 mb-3" />
          <p className="font-semibold text-lg">No appointments booked yet.</p>
          <p className="text-sm text-slate-400 mt-1">Get started by booking your first doctor appointment online.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-teal-100/40 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Doctor / Specialist</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Department</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date & Slot</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Reason for Visit</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 text-slate-700 text-sm">
                {patientAppointments.map((apt) => (
                  <tr key={apt.appointmentId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{apt.appointmentId}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{apt.doctorName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 text-medDarkTeal border border-teal-100/30">
                        {apt.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-700">{apt.appointmentDate}</div>
                        <div className="text-xs text-slate-400 font-medium">{apt.timeSlot}</div>
                      </div>
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
                    <td className="px-6 py-4 text-right">
                      {(apt.status === 'Pending' || apt.status === 'Confirmed') ? (
                        <button
                          onClick={() => handleCancelClick(apt.appointmentId)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-100/40 transition-colors inline-flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No Actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal for cancelling */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 border border-slate-100 text-center animate-scaleUp">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4 border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">Cancel Appointment?</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to cancel this appointment? This action cannot be undone, and the slot will be opened for other patients.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedAptId(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-all shadow-sm shadow-rose-600/10"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
