import React from 'react';
import Sidebar from '../components/Sidebar';
import { getLoggedInUser, getDB, DB_KEYS } from '../utils/db';
import { CalendarDays, Clock, FileText, Activity, Compass, ShieldCheck } from 'lucide-react';

export default function DoctorSchedule() {
  const doctor = getLoggedInUser();
  const schedules = getDB(DB_KEYS.SCHEDULES);

  // Find schedule of this doctor
  const mySchedule = schedules.find((s) => s.doctorId === doctor?.id);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-medBg">
      <Sidebar role="doctor" />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 font-display">My Consultation Schedule</h1>
          <p className="text-slate-500 mt-1">Review your active clinic operating hours and patient appointment slot durations.</p>
        </div>

        {mySchedule ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Schedule Card */}
            <div className="bg-white rounded-3xl border border-teal-100/40 p-6 md:p-8 shadow-sm md:col-span-2 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-medTeal uppercase tracking-wider block">Assigned Clinic</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-0.5">{mySchedule.department}</h3>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {mySchedule.status}
                </span>
              </div>

              <div className="h-px bg-slate-100"></div>

              {/* Consultation Details */}
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
                    <CalendarDays className="w-4 h-4 text-slate-400" /> Weekly Availability Days
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {mySchedule.availableDays.map((day) => (
                      <span 
                        key={day} 
                        className="px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-100/20 text-medDarkTeal font-semibold text-xs"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
                      <Clock className="w-4 h-4 text-slate-400" /> Clinic Consultation Hours
                    </span>
                    <p className="text-lg font-bold text-slate-700 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                      {mySchedule.startTime} - {mySchedule.endTime}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
                      <Activity className="w-4 h-4 text-slate-400" /> Appointment Slot Size
                    </span>
                    <p className="text-lg font-bold text-slate-700 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                      {mySchedule.slotDuration} Minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Tips */}
            <div className="bg-white rounded-3xl border border-teal-100/40 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-base mb-3 font-display">Schedule Guidelines</h4>
                <ul className="space-y-3 text-xs text-slate-500 list-disc list-inside leading-relaxed">
                  <li>Availability timings determine the range of slots patients see when booking.</li>
                  <li>Slot sizes are used to divide consulting hours into separate bookable slots.</li>
                  <li>Schedule details must be edited or created by an <span className="font-bold text-slate-600">Administrator</span>.</li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 inline-flex items-center gap-1">
                <Compass className="w-4 h-4 text-slate-400" />
                <span>Need modifications? Contact Admin.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-teal-100/40 p-12 text-center text-slate-500 max-w-2xl">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-semibold text-lg">No active schedules defined.</p>
            <p className="text-sm text-slate-400 mt-1">Please consult with an administrator to set up your consulting hours in the schedules registry.</p>
          </div>
        )}
      </main>
    </div>
  );
}
