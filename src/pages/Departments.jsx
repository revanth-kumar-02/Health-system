import React from 'react';
import { getDB, DB_KEYS } from '../utils/db';
import { Building, Layers, CheckCircle } from 'lucide-react';

export default function Departments() {
  const departments = getDB(DB_KEYS.DEPARTMENTS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 font-display">Hospital Departments</h1>
        <p className="text-slate-500 mt-2">
          Discover our specialized departments staffed with highly experienced medical practitioners and equipped with advanced therapeutic facilities.
        </p>
      </div>

      {departments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-teal-100/40 p-12 text-center text-slate-500">
          <Layers className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="font-semibold text-lg">No departments found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div 
              key={dept.departmentId} 
              className="bg-white rounded-2xl border border-teal-100/40 p-6 shadow-sm hover:shadow-md transition-all-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-teal-50 text-medTeal">
                    <Building className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    dept.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {dept.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{dept.departmentName}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{dept.description}</p>
              </div>
              
              <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-medium text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                <span>Fully operational unit</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
