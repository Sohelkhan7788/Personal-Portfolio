import { useState } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiHome, HiFolder, HiBadgeCheck, HiCode, HiMail,
  HiLogout, HiMenu, HiX, HiChartBar
} from 'react-icons/hi';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <HiChartBar /> },
  { label: 'Projects', path: '/admin/projects', icon: <HiFolder /> },
  { label: 'Certifications', path: '/admin/certifications', icon: <HiBadgeCheck /> },
  { label: 'Skills', path: '/admin/skills', icon: <HiCode /> },
  { label: 'Messages', path: '/admin/messages', icon: <HiMail /> },
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
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0f0f1a]">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e2a4a] text-white transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-primary' : 'hover:bg-white/10'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-400">
            <HiLogout /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="flex-1 lg:ml-64">

        {/* Topbar */}
        <div className="sticky top-0 bg-white dark:bg-[#1a1a2e] p-4 flex justify-between items-center shadow">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <HiMenu size={24} />
          </button>

          <NavLink to="/" target="_blank" className="text-primary flex items-center gap-1">
            <HiHome /> View Site
          </NavLink>
        </div>

        <div className="p-4 sm:p-6">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;