import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../api';

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  status: 'published'
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  // ==============================
  // 🔥 FETCH PROJECTS (SAFE)
  // ==============================
  const fetchProjects = () => {
    setLoading(true);
    api.get('/projects/admin/all')
      .then(r => {
        console.log("PROJECT API:", r.data);

        // ✅ SAFE HANDLING
        if (Array.isArray(r.data)) {
          setProjects(r.data);
        } else if (Array.isArray(r.data?.data)) {
          setProjects(r.data.data);
        } else if (Array.isArray(r.data?.projects)) {
          setProjects(r.data.projects);
        } else {
          setProjects([]);
        }
      })
      .catch(() => {
        toast.error('Failed to load projects');
        setProjects([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ==============================
  // 🔥 SAVE PROJECT
  // ==============================
  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      technologies: form.technologies
        ? form.technologies.split(',').map(t => t.trim())
        : []
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
      setForm(emptyForm);
      setEditId(null);
      fetchProjects();
    } catch {
      toast.error('Failed to save');
    }
  };

  // ==============================
  // 🔥 DELETE PROJECT
  // ==============================
  const handleDelete = async (id) => {
    if (!confirm('Delete project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success('Deleted!');
      fetchProjects();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="px-4 sm:px-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black">Projects</h2>
          <p className="text-gray-500 text-sm">Manage your portfolio projects</p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setForm(emptyForm);
          }}
          className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold"
        >
          <HiPlus /> Add Project
        </button>
      </div>

      {/* PROJECT LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white dark:bg-[#1e2a4a] rounded-2xl p-4 flex gap-3 shadow"
            >

              {/* ICON */}
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-primary">
                {p.title?.[0] || "P"}
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <h3 className="font-bold text-sm dark:text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {p.description}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2">

                <button
                  onClick={() => {
                    setForm({
                      ...p,
                      technologies: Array.isArray(p.technologies)
                        ? p.technologies.join(', ')
                        : ''
                    });
                    setEditId(p._id);
                    setShowModal(true);
                  }}
                >
                  <HiPencil />
                </button>

                <button onClick={() => handleDelete(p._id)}>
                  <HiTrash />
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <p className="text-center text-gray-400 py-10">
          No projects found
        </p>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e2a4a] p-6 rounded-xl w-full max-w-md">

            <h3 className="text-lg font-bold mb-4">
              {editId ? 'Edit' : 'Add'} Project
            </h3>

            <form onSubmit={handleSave} className="space-y-3">

              <input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="Technologies (React, Node...)"
                value={form.technologies}
                onChange={e => setForm({ ...form, technologies: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full p-2 border rounded"
              >
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