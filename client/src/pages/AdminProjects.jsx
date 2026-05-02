import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiFolder, HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../api'; // 🔥 IMPORTANT CHANGE

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
  const [saving, setSaving] = useState(false);

  const fetchProjects = () => {
    setLoading(true);
    api.get('/projects/admin/all') // 🔥 FIX
      .then(r => {
        console.log("PROJECTS:", r.data);
        setProjects(r.data);
      })
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setForm({
      ...p,
      technologies: p.technologies.join(', ')
    });
    setEditId(p._id);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = {
        ...form,
        technologies: form.technologies
          .split(',')
          .map(t => t.trim())
          .filter(Boolean)
      };

      if (editId) {
        await api.put(`/projects/${editId}`, data);
        toast.success('Project updated!');
      } else {
        await api.post('/projects', data);
        toast.success('Project added!');
      }

      setShowModal(false);
      fetchProjects();

    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success('Deleted!');
      fetchProjects();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Projects</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage your portfolio projects
          </p>
        </div>

        <button onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:scale-105">
          <HiPlus size={20}/> Add Project
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p._id}
              className="bg-white dark:bg-[#1e2a4a] rounded-2xl p-5 flex gap-4 shadow">

              <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-primary">
                {p.title?.[0]}
              </div>

              <div className="flex-1">
                <h3 className="font-bold dark:text-white">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.description}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => openEdit(p)}>
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

      {/* EMPTY */}
      {projects.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-400">
          <HiFolder size={40} className="mx-auto mb-2"/>
          No projects
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center"
          onClick={() => setShowModal(false)}>

          <div className="bg-white p-6 rounded-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}>

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

              <input placeholder="Technologies (comma)"
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
                {saving ? 'Saving...' : 'Save'}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;