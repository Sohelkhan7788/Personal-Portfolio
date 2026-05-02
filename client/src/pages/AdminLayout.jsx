import { useState, useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiHome, HiFolder, HiBadgeCheck, HiCode, HiMail,
  HiLogout, HiMenu, HiX, HiChartBar
} from 'react-icons/hi';
import axios from 'axios';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <HiChartBar size={20}/> },
  { label: 'Projects', path: '/admin/projects', icon: <HiFolder size={20}/> },
  { label: 'Certifications', path: '/admin/certifications', icon: <HiBadgeCheck size={20}/> },
  { label: 'Skills', path: '/admin/skills', icon: <HiCode size={20}/> },
  { label: 'Messages', path: '/admin/messages', icon: <HiMail size={20}/> },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f1a] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e2a4a] text-white flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-lg">S</div>
            <div>
              <div className="font-bold text-white">Admin Panel</div>
              <div className="text-xs text-gray-400">Sohel Khan</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 bg-primary/30 rounded-full flex items-center justify-center text-primary font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-gray-400 truncate">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
          >
            <HiLogout size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300"
          >
            <HiMenu size={22}/>
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg dark:text-white">Portfolio Admin</h1>
          </div>
          <NavLink to="/" target="_blank"
            className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1">
            <HiHome size={16}/> View Site
          </NavLink>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
