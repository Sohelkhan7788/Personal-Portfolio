import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import axios from 'axios';

const emptyForm = { name: '', category: 'frontend', proficiency: 80 };

const categoryOptions = ['frontend', 'backend', 'database', 'devops', 'tools', 'other'];

const AdminSkills = () => {
  const [skills, setSkills] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetch = () => {
    setLoading(true);
    axios.get('/api/skills')
      .then(r => {
        console.log("SKILLS API:", r.data); // 🔥 debug

        // ✅ SAFE HANDLING
        if (Array.isArray(r.data)) {
          setSkills(r.data);
        } else if (Array.isArray(r.data.data)) {
          setSkills(r.data.data);
        } else if (Array.isArray(r.data.skills)) {
          setSkills(r.data.skills);
        } else {
          setSkills([]);
        }
      })
      .catch(() => {
        toast.error('Failed to load');
        setSkills([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (s) => {
    setForm(s);
    setEditId(s._id);
    setShowModal(true);
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await axios.put(`/api/skills/${editId}`, form);
        toast.success('Updated!');
      } else {
        await axios.post('/api/skills', form);
        toast.success('Added!');
      }
      setShowModal(false);
      fetch();
    } catch {
      toast.error('Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await axios.delete(`/api/skills/${id}`);
      toast.success('Deleted!');
      fetch();
    } catch {
      toast.error('Failed');
    }
  };

  // ✅ SAFE grouping
  const grouped = categoryOptions.reduce((acc, cat) => {
    const catSkills = skills.filter(s => s?.category === cat);
    if (catSkills.length) acc[cat] = catSkills;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Skills</h2>
          <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
            Manage your technical skills
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:scale-105"
        >
          <HiPlus size={20}/> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"/>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([cat, catSkills]) => (
              <div key={cat}>
                <h3 className="font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 capitalize">
                  {cat}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catSkills.map((skill, i) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-white dark:bg-[#1e2a4a] rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex items-center gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm dark:text-white">
                            {skill.name}
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {skill.proficiency}%
                          </span>
                        </div>

                        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => openEdit(skill)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <HiPencil size={13}/>
                        </button>

                        <button
                          onClick={() => handleDelete(skill._id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                        >
                          <HiTrash size={13}/>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p>No skills found</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-[#1e2a4a] rounded-3xl p-8 w-full max-w-sm shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold dark:text-white">
                {editId ? 'Edit' : 'Add'} Skill
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700"
              >
                <HiX size={20}/>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <input
                placeholder="Skill name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
              />

              <select
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
              >
                {categoryOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <input
                type="range"
                min="0"
                max="100"
                value={form.proficiency}
                onChange={e => setForm({...form, proficiency: Number(e.target.value)})}
                className="w-full"
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary text-white py-3 rounded-xl"
              >
                {saving ? 'Saving...' : (editId ? 'Update' : 'Add')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;