import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiMailOpen, HiTrash, HiRefresh } from 'react-icons/hi';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetch = () => {
    setLoading(true);
    axios.get('/api/contact/admin/all')
      .then(r => setMessages(r.data))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const markRead = async (id) => {
    try {
      await axios.put(`/api/contact/admin/${id}/read`);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await axios.delete(`/api/contact/admin/${id}`);
      toast.success('Deleted!');
      setSelected(null);
      fetch();
    } catch { toast.error('Failed'); }
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg._id);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Messages</h2>
          <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
            {unread > 0 ? <span className="text-primary font-semibold">{unread} unread</span> : 'All read'} · {messages.length} total
          </p>
        </div>
        <button onClick={fetch} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition">
          <HiRefresh size={20}/>
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"/>)}</div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <motion.div key={msg._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*0.05 }}
              onClick={() => openMessage(msg)}
              className={`bg-white dark:bg-[#1e2a4a] rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md ${
                !msg.read ? 'border-primary/40 bg-primary/5 dark:bg-primary/5' : 'border-gray-100 dark:border-gray-800'
              }`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!msg.read ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                  {!msg.read ? <HiMail size={20}/> : <HiMailOpen size={20}/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-bold text-sm ${!msg.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                      {msg.name}
                      {!msg.read && <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block"/>}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{msg.email}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{msg.message}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); handleDelete(msg._id); }}
                  className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex-shrink-0">
                  <HiTrash size={16}/>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {messages.length === 0 && !loading && (
        <div className="text-center py-16 text-gray-400">
          <HiMail size={48} className="mx-auto mb-3 opacity-30"/>
          <p>No messages yet</p>
        </div>
      )}

      {/* Message Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-[#1e2a4a] rounded-3xl p-8 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-primary text-sm hover:underline">{selected.email}</a>
                </div>
                <span className="text-xs text-gray-400">{new Date(selected.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selected.message}</p>
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${selected.email}`}
                className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition text-center text-sm">
                Reply via Email
              </a>
              <button onClick={() => { handleDelete(selected._id); setSelected(null); }}
                className="px-5 py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 font-semibold text-sm transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
