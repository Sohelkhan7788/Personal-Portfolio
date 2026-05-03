import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiFolder, HiBadgeCheck, HiCode, HiMail, HiTrendingUp } from 'react-icons/hi';
import axios from 'axios';

const StatCard = ({ title, value, icon, color, path, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-[#1e2a4a] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}>
        {icon}
      </div>
      <NavLink to={path} className="text-xs text-primary hover:underline font-medium">View all →</NavLink>
    </div>
    <div className="text-3xl font-black dark:text-white mb-1">{value ?? '—'}</div>
    <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('/api/stats')
      .then(r => setStats(r.data))
      .catch(() => setStats({ projects: 0, certifications: 0, skills: 0, messages: 0, unreadMessages: 0 }));
  }, []);

  const cards = [
    { title: 'Total Projects', value: stats?.projects, icon: <HiFolder size={24}/>, color: 'bg-blue-500', path: '/admin/projects', delay: 0.1 },
    { title: 'Certifications', value: stats?.certifications, icon: <HiBadgeCheck size={24}/>, color: 'bg-green-500', path: '/admin/certifications', delay: 0.2 },
    { title: 'Skills Added', value: stats?.skills, icon: <HiCode size={24}/>, color: 'bg-purple-500', path: '/admin/skills', delay: 0.3 },
    { title: 'Total Messages', value: stats?.messages, icon: <HiMail size={24}/>, color: 'bg-primary', path: '/admin/messages', delay: 0.4 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Unread alert */}
      {stats?.unreadMessages > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center gap-3">
          <HiMail className="text-primary" size={22}/>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            You have <strong className="text-primary">{stats.unreadMessages} unread message{stats.unreadMessages > 1 ? 's' : ''}</strong>
          </span>
          <NavLink to="/admin/messages" className="ml-auto text-sm bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-dark transition">
            View
          </NavLink>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map(card => <StatCard key={card.title} {...card} />)}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#1e2a4a] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-lg dark:text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Add Project', path: '/admin/projects', color: 'bg-blue-500' },
            { label: '+ Add Certification', path: '/admin/certifications', color: 'bg-green-500' },
            { label: '+ Add Skill', path: '/admin/skills', color: 'bg-purple-500' },
          ].map(action => (
            <NavLink key={action.label} to={action.path}
              className={`${action.color} text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all hover:scale-105`}>
              {action.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
