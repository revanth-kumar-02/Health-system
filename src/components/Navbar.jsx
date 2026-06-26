import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, LogOut, User, Calendar, Award, Building, LayoutDashboard, Clock } from 'lucide-react';
import { getLoggedInUser, setLoggedInUser } from '../utils/db';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getLoggedInUser();

  // Do not show navbar on Login or Register pages
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/access-denied') {
    return null;
  }

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'doctor') return '/doctor-dashboard';
    return '/patient-dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-teal-100/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <Link to="/home" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-medTeal to-medDarkTeal flex items-center justify-center text-white shadow-md shadow-teal-700/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-medDarkTeal font-display">
                Health Care <span className="text-medTeal">System</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links - Conditional based on user role */}
          {user && (
            <nav className="hidden md:flex space-x-1">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all-300 ${
                    isActive
                      ? 'bg-medSoftBlue text-medDarkTeal font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                Home
              </NavLink>

              {user.role === 'patient' && (
                <>
                  <NavLink
                    to="/departments"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all-300 ${
                        isActive
                          ? 'bg-medSoftBlue text-medDarkTeal font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    Departments
                  </NavLink>
                  <NavLink
                    to="/doctors"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all-300 ${
                        isActive
                          ? 'bg-medSoftBlue text-medDarkTeal font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    Doctors
                  </NavLink>
                  <NavLink
                    to="/schedule"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all-300 ${
                        isActive
                          ? 'bg-medSoftBlue text-medDarkTeal font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    Schedule
                  </NavLink>
                  <NavLink
                    to="/book-appointment"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all-300 ${
                        isActive
                          ? 'bg-medSoftBlue text-medDarkTeal font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    Book Appointment
                  </NavLink>
                  <NavLink
                    to="/my-appointments"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all-300 ${
                        isActive
                          ? 'bg-medSoftBlue text-medDarkTeal font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    My Appointments
                  </NavLink>
                </>
              )}
            </nav>
          )}

          {/* User profile controls & Logout */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-medTeal/10 hover:bg-medTeal/20 text-medDarkTeal text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{user.role} Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-slate-700 leading-none">{user.name}</p>
                    <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-medTeal text-white font-semibold hover:bg-medDarkTeal transition-all-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
