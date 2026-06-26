import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserSquare2, 
  Building, 
  CalendarRange, 
  CalendarDays, 
  Users, 
  CalendarPlus, 
  LogOut,
  User,
  HeartPulse
} from 'lucide-react';
import { setLoggedInUser } from '../utils/db';

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/login');
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Manage Doctors', path: '/admin/manage-doctors', icon: UserSquare2 },
    { name: 'Manage Departments', path: '/admin/manage-departments', icon: Building },
    { name: 'Manage Schedules', path: '/admin/manage-schedules', icon: CalendarRange },
    { name: 'Manage Appointments', path: '/admin/manage-appointments', icon: CalendarDays },
    { name: 'View Patients', path: '/admin/view-patients', icon: Users },
    { name: 'New Schedule', path: '/admin/create-schedule', icon: CalendarPlus },
  ];

  const doctorLinks = [
    { name: 'Dashboard', path: '/doctor-dashboard', icon: LayoutDashboard },
    { name: 'Appointments', path: '/doctor-appointments', icon: CalendarDays },
    { name: 'My Schedule', path: '/doctor-schedule', icon: CalendarRange },
    { name: 'My Profile', path: '/doctor-profile', icon: User },
  ];

  const links = role === 'admin' ? adminLinks : doctorLinks;

  return (
    <aside className="w-64 bg-medSidebar border-r border-teal-100/50 flex flex-col min-h-[calc(100vh-4rem)] shadow-sm">
      {/* Sidebar Header Title */}
      <div className="p-6 border-b border-teal-100/30">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-medTeal animate-pulse" />
          <h2 className="text-sm font-bold text-medDarkTeal uppercase tracking-wider">
            {role === 'admin' ? 'Administration' : 'Doctor Portal'}
          </h2>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          // Exact match for Dashboard, prefix match for nested admin settings
          const isActive = location.pathname === link.path;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all-300 ${
                isActive
                  ? 'bg-medTeal text-white shadow-md shadow-teal-700/10'
                  : 'text-slate-600 hover:bg-teal-50 hover:text-medDarkTeal'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Footer Section */}
      <div className="p-4 border-t border-teal-100/30">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
