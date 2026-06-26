import React, { useState } from 'react';
import { getDB, DB_KEYS } from '../utils/db';
import { Stethoscope, Search, Calendar, Clock, Sparkles } from 'lucide-react';

export default function Doctors() {
  const doctors = getDB(DB_KEYS.DOCTORS);
  const departments = getDB(DB_KEYS.DEPARTMENTS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Filter doctors list
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 font-display">Our Medical Specialists</h1>
        <p className="text-slate-500 mt-2">
          Consult with our premium, board-certified medical professionals specialized across major clinical departments.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-teal-100/40 p-5 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctor name or specialty..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm transition-all"
          />
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">Filter Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full md:w-56 py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm transition-all bg-white"
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentName}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-teal-100/40 p-12 text-center text-slate-500">
          <Stethoscope className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="font-semibold text-lg">No specialists found matching filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div 
              key={doc.doctorId}
              className="bg-white rounded-2xl border border-teal-100/40 shadow-sm overflow-hidden hover:shadow-md transition-all-300 flex flex-col justify-between"
            >
              {/* Header card info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-medTeal">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    doc.status === 'Available' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                      : 'bg-rose-50 text-rose-700 border border-rose-100'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800">{doc.doctorName}</h3>
                <p className="text-xs text-medTeal font-bold uppercase tracking-wider mb-2">{doc.department} • {doc.specialization}</p>
                
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500 mb-4 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                  <span>🎓 {doc.qualification}</span>
                  <span className="text-slate-300">|</span>
                  <span>💼 {doc.experience} Years Exp.</span>
                </div>

                {/* Available details */}
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-slate-500 text-xs uppercase block">Available Days</span>
                      <p className="text-slate-700 text-xs font-semibold">
                        {Array.isArray(doc.availableDays) ? doc.availableDays.join(', ') : doc.availableDays}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-slate-500 text-xs uppercase block">Consultation Hours</span>
                      <p className="text-slate-700 text-xs font-semibold">{doc.availableTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Email: <span className="font-semibold text-slate-600 block">{doc.email}</span>
                </div>
                {doc.status === 'Available' && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-medTeal bg-teal-50 px-2 py-1 rounded-md border border-teal-100">
                    <Sparkles className="w-3 h-3 text-medTeal" /> Accepting Patients
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
