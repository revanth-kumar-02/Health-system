import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { getDB, DB_KEYS } from '../../utils/db';
import { Search, User, Mail, Phone, Calendar, Heart, FileText, ChevronRight } from 'lucide-react';

export default function ViewPatients() {
  const users = getDB(DB_KEYS.USERS);
  const appointments = getDB(DB_KEYS.APPOINTMENTS);

  // Filter patients only
  const patients = users.filter((u) => u.role === 'patient');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Filter list based on search parameters
  const filtered = patients.filter((pat) => {
    return (
      pat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pat.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pat.phone && pat.phone.includes(searchTerm))
    );
  });

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const patientHistory = selectedPatient
    ? appointments.filter((apt) => apt.patientId === selectedPatient.id)
    : [];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-medBg">
      <Sidebar role="admin" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 font-display">Hospital Patients Registry</h1>
          <p className="text-slate-500 mt-1">Browse registered patient demographic profiles and view their individual consultation histories (Read-Only).</p>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-teal-100/40 p-5 shadow-sm mb-6">
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name, email, or phone..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patients List Grid */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-teal-100/40 shadow-sm overflow-hidden h-[600px] flex flex-col">
            <div className="overflow-y-auto flex-1">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Patient</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Contact Details</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Gender & DOB</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-slate-700 text-sm">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                        No registered patients matching requirements.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((pat) => (
                      <tr 
                        key={pat.id} 
                        className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${
                          selectedPatientId === pat.id ? 'bg-teal-50/30' : ''
                        }`}
                        onClick={() => setSelectedPatientId(pat.id)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">{pat.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {pat.id}</div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <div>Email: <span className="font-semibold text-slate-700">{pat.email}</span></div>
                          <div className="mt-0.5">Phone: <span className="font-semibold text-slate-700">{pat.phone || 'N/A'}</span></div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <div>Gender: <span className="font-semibold text-slate-700">{pat.gender}</span></div>
                          <div className="mt-0.5">DOB: <span className="font-semibold text-slate-700">{pat.dob || 'N/A'}</span></div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatientId(pat.id);
                            }}
                            className="text-xs font-bold text-medTeal bg-teal-50 hover:bg-teal-100/60 px-3 py-1.5 rounded-lg border border-teal-100/30 transition-colors inline-flex items-center gap-0.5"
                          >
                            History <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details & History Panel */}
          <div className="bg-white rounded-3xl border border-teal-100/40 p-6 shadow-sm self-start min-h-[400px] flex flex-col">
            {selectedPatient ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-base mb-4 font-display">Demographics Overview</h3>
                  
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-xs space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Name:</span>
                      <span className="font-bold text-slate-700">{selectedPatient.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Patient ID:</span>
                      <span className="font-mono text-slate-600">{selectedPatient.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Email:</span>
                      <span className="font-semibold text-slate-700">{selectedPatient.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Phone:</span>
                      <span className="font-semibold text-slate-700">{selectedPatient.phone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Gender:</span>
                      <span className="font-semibold text-slate-700">{selectedPatient.gender}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">DOB:</span>
                      <span className="font-semibold text-slate-700">{selectedPatient.dob || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Consultation History */}
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-3 font-display">Consultation History</h3>
                  
                  {patientHistory.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs italic bg-slate-50 rounded-2xl border border-slate-100/50">
                      No appointments recorded for this patient.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {patientHistory.map((apt) => (
                        <div 
                          key={apt.appointmentId}
                          className="p-3 bg-slate-50 border border-slate-100/60 rounded-xl text-xs flex justify-between items-start"
                        >
                          <div>
                            <div className="font-semibold text-slate-700">{apt.doctorName}</div>
                            <div className="text-[10px] text-slate-400 uppercase mt-0.5">{apt.department}</div>
                            <div className="text-[10px] text-slate-500 italic mt-1 font-medium">"{apt.reasonForVisit}"</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 font-semibold block">{apt.appointmentDate}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold mt-1.5 inline-block ${
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
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-center text-slate-400 p-6">
                <User className="w-12 h-12 text-slate-200 mb-3" />
                <p className="font-semibold text-sm">No Patient Selected</p>
                <p className="text-xs text-slate-400 mt-1">Select a patient from the list to view demographics and consultation history.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
