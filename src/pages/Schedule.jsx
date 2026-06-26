import React, { useState } from 'react';
import { getDB, DB_KEYS } from '../utils/db';
import { Search, CalendarDays, Clock, Filter, Sparkles, RefreshCw } from 'lucide-react';

export default function Schedule() {
  const schedules = getDB(DB_KEYS.SCHEDULES);
  const departments = getDB(DB_KEYS.DEPARTMENTS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Filter schedules
  const filteredSchedules = schedules.filter((sch) => {
    const matchesSearch = sch.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || sch.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 font-display">Hospital Operation Schedules</h1>
        <p className="text-slate-500 mt-2">
          View doctor availability schedules, consulting hours, and appointment session durations for each medical clinic.
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
            placeholder="Search physician schedule..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medTeal/20 focus:border-medTeal text-slate-700 text-sm transition-all"
          />
        </div>

        {/* Department filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">Clinic Filter:</span>
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

      {/* Schedules list */}
      {filteredSchedules.length === 0 ? (
        <div className="bg-white rounded-2xl border border-teal-100/40 p-12 text-center text-slate-500">
          <CalendarDays className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="font-semibold text-lg">No active schedules found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-teal-100/40 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Doctor</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Department</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Available Days</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Consultation Timings</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Slot Size</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 text-slate-700 text-sm">
                {filteredSchedules.map((sch) => (
                  <tr key={sch.scheduleId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{sch.doctorName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 text-medDarkTeal border border-teal-100/30">
                        {sch.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {Array.isArray(sch.availableDays) ? sch.availableDays.join(', ') : sch.availableDays}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{sch.startTime} - {sch.endTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-600">{sch.slotDuration} mins</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        sch.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        {sch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
