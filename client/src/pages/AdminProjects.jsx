import { useState, useEffect } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import api from "../api";

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  liveUrl: "",
  githubUrl: "",
  status: "published",
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  // ==============================
  // 🔥 FETCH PROJECTS
  // ==============================
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects/admin/all");

      if (Array.isArray(res.data)) {
        setProjects(res.data);
      } else if (Array.isArray(res.data?.data)) {
        setProjects(res.data.data);
      } else if (Array.isArray(res.data?.projects)) {
        setProjects(res.data.projects);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ==============================
  // 🔥 SAVE PROJECT (FIXED)
  // ==============================
  const handleSave = async (e) => {
    e.preventDefault();

    // 🔥 validation
    if (!form.title.trim()) {
      return toast.error("Title is required");
    }

    if (!form.description.trim()) {
      return toast.error("Description is required");
    }

    // 🔥 FIXED DATA FORMAT
    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        ? form.technologies.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      liveUrl: form.liveUrl || "",
      githubUrl: form.githubUrl || "",
      status: form.status || "published",
    };

    console.log("🚀 Sending:", data);

    try {
      if (editId) {
        await api.put(`/projects/${editId}`, data);
        toast.success("Project updated");
      } else {
        await api.post("/projects", data);
        toast.success("Project added");
      }

      setShowModal(false);
      setForm(emptyForm);
      setEditId(null);
      fetchProjects();
    } catch (err) {
      console.error("❌ ERROR:", err?.response?.data);
      toast.error(err?.response?.data?.message || "Failed to save project");
    }
  };

  // ==============================
  // 🔥 DELETE
  // ==============================
  const handleDelete = async (id) => {
    if (!confirm("Delete project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success("Deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="px-4 sm:px-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black">Projects</h2>
          <p className="text-gray-500 text-sm">
            Manage your portfolio projects
          </p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setForm(emptyForm);
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          <HiPlus /> Add Project
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No projects found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white dark:bg-[#1e2a4a] rounded-2xl p-4 shadow flex gap-3"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-primary">
                {p.title?.[0] || "P"}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-sm dark:text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {p.description}
                </p>

                <div className="flex gap-2 mt-2 text-xs">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" className="text-primary">
                      Live
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" className="text-gray-400">
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">

                <button
                  onClick={() => {
                    setForm({
                      ...p,
                      technologies: Array.isArray(p.technologies)
                        ? p.technologies.join(", ")
                        : "",
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
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white dark:bg-[#1e2a4a] p-6 rounded-xl w-full max-w-md">

            <h3 className="text-lg font-bold mb-4">
              {editId ? "Edit" : "Add"} Project
            </h3>

            <form onSubmit={handleSave} className="space-y-3">

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="Technologies (React, Node...)"
                value={form.technologies}
                onChange={(e) =>
                  setForm({ ...form, technologies: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="Live URL"
                value={form.liveUrl}
                onChange={(e) =>
                  setForm({ ...form, liveUrl: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <input
                placeholder="GitHub URL"
                value={form.githubUrl}
                onChange={(e) =>
                  setForm({ ...form, githubUrl: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
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