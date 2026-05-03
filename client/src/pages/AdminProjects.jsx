import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiFolder, HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../api';

const emptyForm = {
  title: '',
  description: '',
  longDescription: '',
  image: '',
  technologies: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  status: 'published'
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchProjects = () => {
    setLoading(true);
    api.get('/projects/admin/all')
      .then(r => setProjects(r.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim())
    };

    try {
      if (editId) {
        await api.put(`/projects/${editId}`, data);
        toast.success('Updated!');
      } else {
        await api.post('/projects', data);
        toast.success('Added!');
      }
      setShowModal(false);
      fetchProjects();
    } catch {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div className="px-3 sm:px-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black">Projects</h2>
          <p className="text-gray-500 text-sm">Manage your portfolio projects</p>
        </div>

        <button onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}
          className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold w-full sm:w-auto">
          <HiPlus /> Add Project
        </button>
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p._id}
              className="bg-white dark:bg-[#1e2a4a] rounded-2xl p-4 sm:p-5 flex gap-3 shadow">

              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-primary">
                {p.title?.[0]}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-sm sm:text-base dark:text-white">{p.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{p.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => { setForm({...p, technologies: p.technologies.join(', ') }); setEditId(p._id); setShowModal(true); }}>
                  <HiPencil />
                </button>
                <button onClick={() => handleDelete(p._id)}>
                  <HiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e2a4a] p-4 sm:p-6 rounded-xl w-full max-w-md mx-2">

            <h3 className="text-lg font-bold mb-4">
              {editId ? 'Edit' : 'Add'} Project
            </h3>

            <form onSubmit={handleSave} className="space-y-3">

              <input placeholder="Title"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                className="w-full p-2 border rounded" />

              <input placeholder="Description"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full p-2 border rounded" />

              <input placeholder="Technologies"
                value={form.technologies}
                onChange={e => setForm({...form, technologies: e.target.value})}
                className="w-full p-2 border rounded" />

              <select value={form.status}
                onChange={e => setForm({...form, status: e.target.value})}
                className="w-full p-2 border rounded">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <button className="w-full bg-primary text-white py-2 rounded">
                Save
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProjects;