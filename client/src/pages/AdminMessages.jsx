import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiMailOpen, HiTrash, HiRefresh } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../api'; // 🔥 FIXED

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/contact/admin/all'); // 🔥 FIXED

      console.log("MESSAGES API:", res.data);

      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else if (Array.isArray(res.data.data)) {
        setMessages(res.data.data);
      } else if (Array.isArray(res.data.messages)) {
        setMessages(res.data.messages);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/contact/admin/${id}/read`); // 🔥 FIXED
      setMessages(prev =>
        prev.map(m => m._id === id ? { ...m, read: true } : m)
      );
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/admin/${id}`); // 🔥 FIXED
      toast.success('Deleted!');
      setSelected(null);
      fetchMessages();
    } catch {
      toast.error('Failed');
    }
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
            {unread > 0 ? (
              <span className="text-primary font-semibold">{unread} unread</span>
            ) : 'All read'} · {messages.length} total
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition"
        >
          <HiRefresh size={20}/>
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : messages.length > 0 ? (
        messages.map(msg => (
          <div key={msg._id} onClick={() => openMessage(msg)}>
            {msg.name} - {msg.email}
          </div>
        ))
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};

export default AdminMessages;