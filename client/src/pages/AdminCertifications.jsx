import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiX, HiBadgeCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../api';

const emptyForm = { title: '', issuer: '', issueDate: '', expiryDate: '', credentialUrl: '', credentialId: '', status: 'published' };

const AdminCertifications = () => {
  const [certs, setCerts] = useState([]); // ✅ ALWAYS ARRAY
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetch = () => {
    setLoading(true);
    axios.get('/api/certifications/admin/all')
      .then(r => {
        console.log("CERT API:", r.data); // 🔥 DEBUG

        // ✅ SAFE DATA HANDLING
        if (Array.isArray(r.data)) {
          setCerts(r.data);
        } else if (Array.isArray(r.data.data)) {
          setCerts(r.data.data);
        } else if (Array.isArray(r.data.certifications)) {
          setCerts(r.data.certifications);
        } else {
          setCerts([]); // fallback
        }
      })
      .catch(() => {
        toast.error('Failed to load');
        setCerts([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (c) => { setForm(c); setEditId(c._id); setShowModal(true); };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await axios.put(`/api/certifications/${editId}`, form);
        toast.success('Updated!');
      } else {
        await axios.post('/api/certifications', form);
        toast.success('Added!');
      }
      setShowModal(false);
      fetch();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    try {
      await axios.delete(`/api/certifications/${id}`);
      toast.success('Deleted!');
      fetch();
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Certifications</h2>
          <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">Manage your certifications</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:scale-105">
          <HiPlus size={20}/> Add Certification
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"/>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {certs.length > 0 ? (
            certs.map((c, i) => (
              <motion.div key={c._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*0.05 }}
                className="bg-white dark:bg-[#1e2a4a] rounded-2xl p-5 border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm">

                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold flex-shrink-0">
                  {c.issuer?.[0] || 'C'}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold dark:text-white text-sm truncate">{c.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {c.issuer} · Issued {c.issueDate}{c.expiryDate ? ` — Expires ${c.expiryDate}` : ''}
                  </p>
                </div>

                <span className={`text-xs px-2 py-1 rounded-lg flex-shrink-0 ${c.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {c.status}
                </span>

                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <HiPencil size={16}/>
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100">
                    <HiTrash size={16}/>
                  </button>
                </div>

              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400">
              <HiBadgeCheck size={48} className="mx-auto mb-3 opacity-30"/>
              <p>No certifications yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCertifications;